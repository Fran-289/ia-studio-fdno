import { Controller, Post, Get, Body, UseGuards, Req, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-checkout')
  @UseGuards(JwtAuthGuard)
  async createCheckout(@Req() req: any, @Body() body: { plan: string }) {
    return this.paymentsService.createCheckoutSession(req.user.sub, body.plan, req.user.email);
  }

  @Post('webhook')
  async webhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    return this.paymentsService.handleWebhook(req.body, signature);
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  async getSubscription(@Req() req: any) {
    return this.paymentsService.getSubscription(req.user.sub);
  }
}
