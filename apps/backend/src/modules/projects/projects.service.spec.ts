import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../../config/prisma.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: any;

  const mockProject = {
    id: 'proj-1',
    name: 'Test Project',
    type: 'IMAGE',
    userId: 'user-1',
    status: 'DRAFT',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    prisma = {
      project: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('findAll', () => {
    it('should return all projects for user', async () => {
      prisma.project.findMany.mockResolvedValue([mockProject]);

      const result = await service.findAll('user-1');
      expect(result).toHaveLength(1);
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { updatedAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return project if found', async () => {
      prisma.project.findFirst.mockResolvedValue(mockProject);

      const result = await service.findOne('proj-1', 'user-1');
      expect(result.id).toBe('proj-1');
    });

    it('should throw NotFoundException if not found', async () => {
      prisma.project.findFirst.mockResolvedValue(null);

      await expect(service.findOne('invalid', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return project', async () => {
      prisma.project.create.mockResolvedValue(mockProject);

      const result = await service.create('user-1', { name: 'Test Project', type: 'IMAGE' });
      expect(result.name).toBe('Test Project');
      expect(prisma.project.create).toHaveBeenCalledWith({
        data: { name: 'Test Project', type: 'IMAGE', userId: 'user-1' },
      });
    });
  });

  describe('update', () => {
    it('should update existing project', async () => {
      prisma.project.findFirst.mockResolvedValue(mockProject);
      prisma.project.update.mockResolvedValue({ ...mockProject, name: 'Updated' });

      const result = await service.update('proj-1', 'user-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if not found', async () => {
      prisma.project.findFirst.mockResolvedValue(null);

      await expect(service.update('invalid', 'user-1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete existing project', async () => {
      prisma.project.findFirst.mockResolvedValue(mockProject);
      prisma.project.delete.mockResolvedValue(mockProject);

      const result = await service.delete('proj-1', 'user-1');
      expect(result.id).toBe('proj-1');
    });

    it('should throw if not found', async () => {
      prisma.project.findFirst.mockResolvedValue(null);

      await expect(service.delete('invalid', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('duplicate', () => {
    it('should duplicate project with suffix', async () => {
      prisma.project.findFirst.mockResolvedValue(mockProject);
      prisma.project.create.mockResolvedValue({ ...mockProject, id: 'proj-2', name: 'Test Project (Copia)' });

      const result = await service.duplicate('proj-1', 'user-1');
      expect(result.name).toContain('(Copia)');
    });
  });
});
