import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../config/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;

  const mockUser = {
    id: 'user-1',
    email: 'test@test.com',
    name: 'Test User',
    credits: 50,
    subscription: { plan: 'FREE', credits: 50 },
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findById', () => {
    it('should return user with subscription', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      const result = await service.findById('user-1');
      expect(result.email).toBe('test@test.com');
      expect(result.subscription).toBeDefined();
    });

    it('should throw if not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.findById('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCredits', () => {
    it('should return user credits', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      const result = await service.getCredits('user-1');
      expect(result.credits).toBe(50);
    });
  });

  describe('deductCredits', () => {
    it('should deduct credits if sufficient', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue({ ...mockUser, credits: 45 });

      const result = await service.deductCredits('user-1', 5);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { credits: { decrement: 5 } },
      });
    });

    it('should throw if insufficient credits', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      await expect(service.deductCredits('user-1', 999)).rejects.toThrow('Créditos insuficientes');
    });
  });
});
