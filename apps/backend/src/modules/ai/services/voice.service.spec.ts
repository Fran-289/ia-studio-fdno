import { Test, TestingModule } from '@nestjs/testing';
import { VoiceService } from './voice.service';

global.fetch = jest.fn();

describe('VoiceService', () => {
  let service: VoiceService;

  beforeEach(async () => {
    (global.fetch as jest.Mock).mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceService],
    }).compile();

    service = module.get<VoiceService>(VoiceService);
  });

  describe('textToSpeech', () => {
    it('should return error if text is empty', async () => {
      const result = await service.textToSpeech({ text: '' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Texto requerido');
    });

    it('should generate speech successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(Buffer.from('fake-audio')),
      });

      const result = await service.textToSpeech({ text: 'Hola mundo' });
      expect(result.success).toBe(true);
      expect(result.data?.audio).toBeDefined();
    });

    it('should handle API error', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      const result = await service.textToSpeech({ text: 'Hola' });
      expect(result.success).toBe(false);
    });
  });

  describe('not implemented', () => {
    it('clone returns not available', async () => {
      const result = await service.clone({});
      expect(result.success).toBe(false);
    });

    it('translate returns not available', async () => {
      const result = await service.translate({});
      expect(result.success).toBe(false);
    });
  });
});
