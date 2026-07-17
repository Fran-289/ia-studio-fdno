import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { PrismaService } from '../../config/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: any;
  let jwtService: any;

  const mockUser = {
    id: 'user-1',
    email: 'test@test.com',
    name: 'Test User',
    password: '$2a$12$hashed',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await service.register({
        email: 'test@test.com',
        password: 'Test1234!',
        name: 'Test User',
      });

      expect(result.user).toBeDefined();
      expect(result.user.password).toBeUndefined();
      expect(result.access_token).toBe('mock-token');
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email exists', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.register({
          email: 'test@test.com',
          password: 'Test1234!',
          name: 'Test User',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login({
        email: 'test@test.com',
        password: 'Test1234!',
      });

      expect(result.access_token).toBe('mock-token');
      expect(result.user.password).toBeUndefined();
    });

    it('should throw UnauthorizedException if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'wrong@test.com', password: 'Test1234!' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.login({ email: 'test@test.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('should return sanitized user', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.validateUser('user-1');
      expect(result).toBeDefined();
      expect(result.password).toBeUndefined();
    });

    it('should throw if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.validateUser('invalid')).rejects.toThrow(UnauthorizedException);
    });
  });
});
