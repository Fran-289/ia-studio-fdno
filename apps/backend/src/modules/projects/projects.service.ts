import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { ProjectType } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return project;
  }

  async create(userId: string, data: { name: string; type: string }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        type: data.type as ProjectType,
        userId,
      },
    });
  }

  async update(id: string, userId: string, data: any) {
    await this.findOne(id, userId);
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async duplicate(id: string, userId: string) {
    const project = await this.findOne(id, userId);
    return this.prisma.project.create({
      data: {
        name: `${project.name} (Copia)`,
        type: project.type,
        userId,
        settings: project.settings as Prisma.InputJsonValue,
      },
    });
  }
}
