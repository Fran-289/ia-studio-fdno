import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return false;
    const admin = await this.prisma.adminUser.findUnique({ where: { email: user.email } });
    return !!admin;
  }

  async listUsers() {
    return this.prisma.user.findMany({
      include: { subscription: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async setCredits(userId: string, credits: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.prisma.user.update({
      where: { id: userId },
      data: { credits },
    });

    await this.prisma.subscription.upsert({
      where: { userId },
      update: { credits },
      create: { userId, credits },
    });

    return { success: true, credits };
  }

  async setPlan(userId: string, plan: string, credits: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    await this.prisma.subscription.upsert({
      where: { userId },
      update: { plan: plan as any, credits },
      create: { userId, plan: plan as any, credits },
    });

    return { success: true, plan, credits };
  }
}
