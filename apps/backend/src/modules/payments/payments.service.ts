import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../config/prisma.service';

// Stripe v22+ es ESM-only, usamos require para compatibilidad CJS
const Stripe = require('stripe');

const PRICES: Record<string, { credits: number; amount: number }> = {
  PRO: { credits: 500, amount: 2900 },
  BUSINESS: { credits: 2000, amount: 9900 },
};

@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: any;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2026-06-24.dahlia',
    });
  }

  private async ensureCustomer(userId: string, email: string) {
    let sub = await this.prisma.subscription.findUnique({ where: { userId } });
    if (sub?.stripeCustomerId) return sub.stripeCustomerId;

    const customer = await this.stripe.customers.create({
      email,
      metadata: { userId },
    });

    await this.prisma.subscription.upsert({
      where: { userId },
      update: { stripeCustomerId: customer.id },
      create: { userId, stripeCustomerId: customer.id },
    });

    return customer.id;
  }

  async createCheckoutSession(userId: string, plan: string, email: string) {
    const price = PRICES[plan];
    if (!price) return { success: false, error: 'Plan inválido' };

    try {
      const customerId = await this.ensureCustomer(userId, email);

      const session = await this.stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: `IA Studio - ${plan}` },
            unit_amount: price.amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }],
        success_url: `${this.configService.get('FRONTEND_URL')}/dashboard?payment=success`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/dashboard/pricing`,
        metadata: { userId, plan },
      });

      return { success: true, data: { url: session.url, sessionId: session.id } };
    } catch (error: any) {
      this.logger.error(`Checkout error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async handleWebhook(body: any, signature: string) {
    try {
      const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
      let event: any;

      if (secret) {
        const rawBody = Buffer.isBuffer(body) ? body : Buffer.from(JSON.stringify(body));
        event = this.stripe.webhooks.constructEvent(rawBody, signature, secret);
      } else {
        event = body;
      }

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          const userId = session.metadata?.userId;
          const plan = session.metadata?.plan;

          if (userId && plan) {
            const credits = PRICES[plan]?.credits ?? 500;
            await this.prisma.subscription.upsert({
              where: { userId },
              update: {
                plan,
                status: 'ACTIVE',
                stripeSubscriptionId: session.subscription,
                credits: { increment: credits },
              },
              create: {
                userId,
                plan,
                status: 'ACTIVE',
                stripeSubscriptionId: session.subscription,
                credits,
              },
            });
          }
          break;
        }

        case 'invoice.paid': {
          const invoice = event.data.object;
          const subId = invoice.subscription;
          if (subId) {
            const sub = await this.prisma.subscription.findFirst({
              where: { stripeSubscriptionId: subId },
            });
            if (sub) {
              const credits = PRICES[sub.plan]?.credits ?? 500;
              await this.prisma.subscription.update({
                where: { id: sub.id },
                data: { creditsUsed: 0, credits: { increment: credits } },
              });
            }
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const sub = event.data.object;
          await this.prisma.subscription.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { status: 'CANCELED', plan: 'FREE' },
          });
          break;
        }
      }

      return { success: true };
    } catch (error: any) {
      this.logger.error(`Webhook error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async getSubscription(userId: string) {
    const sub = await this.prisma.subscription.findUnique({ where: { userId } });
    return {
      success: true,
      data: sub ?? {
        plan: 'FREE',
        status: 'ACTIVE',
        credits: 50,
        creditsUsed: 0,
      },
    };
  }
}
