import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateProfile(id: string, data: { name?: string; avatar?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getCredits(id: string) {
    const user = await this.findById(id);
    return { credits: user.credits };
  }

  async deductCredits(id: string, amount: number) {
    const user = await this.findById(id);

    if (user.credits < amount) {
      throw new Error('Créditos insuficientes');
    }

    return this.prisma.user.update({
      where: { id },
      data: { credits: { decrement: amount } },
    });
  }

  async addCredits(id: string, amount: number) {
    return this.prisma.user.update({
      where: { id },
      data: { credits: { increment: amount } },
    });
  }
}
