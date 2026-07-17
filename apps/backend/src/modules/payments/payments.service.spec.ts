import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../../config/prisma.service';

const mockStripe = {
  customers: { create: jest.fn() },
  checkout: { sessions: { create: jest.fn() } },
  webhooks: { constructEvent: jest.fn() },
};

jest.mock('stripe', () => jest.fn(() => mockStripe));

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prisma: any;
  let configService: any;

  beforeEach(async () => {
    prisma = {
      subscription: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        upsert: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
    };

    configService = {
      get: jest.fn((key: string) => {
        if (key === 'STRIPE_SECRET_KEY') return 'sk_test_mock';
        if (key === 'FRONTEND_URL') return 'http://localhost:3001';
        return null;
      }),
    };

    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: ConfigService, useValue: configService },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    service.onModuleInit();
  });

  describe('getSubscription', () => {
    it('should return free plan when no subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue(null);

      const result = await service.getSubscription('user-1');
      expect(result.success).toBe(true);
      expect(result.data.plan).toBe('FREE');
      expect(result.data.credits).toBe(50);
    });

    it('should return existing subscription', async () => {
      prisma.subscription.findUnique.mockResolvedValue({
        plan: 'PRO',
        status: 'ACTIVE',
        credits: 500,
        creditsUsed: 50,
      });

      const result = await service.getSubscription('user-1');
      expect(result.success).toBe(true);
      expect(result.data.plan).toBe('PRO');
      expect(result.data.credits).toBe(500);
    });
  });

  describe('createCheckoutSession', () => {
    it('should return error for invalid plan', async () => {
      const result = await service.createCheckoutSession('user-1', 'INVALID', 'test@test.com');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Plan inválido');
    });

    it('should create Stripe checkout session for PRO plan', async () => {
      mockStripe.customers.create.mockResolvedValue({ id: 'cus_mock' });
      mockStripe.checkout.sessions.create.mockResolvedValue({
        id: 'cs_mock',
        url: 'https://checkout.stripe.com/test',
      });
      prisma.subscription.findUnique.mockResolvedValue(null);

      const result = await service.createCheckoutSession('user-1', 'PRO', 'test@test.com');

      expect(result.success).toBe(true);
      expect(result.data?.url).toContain('stripe.com');
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalled();
    });
  });
});
