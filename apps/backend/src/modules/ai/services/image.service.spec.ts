import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';

global.fetch = jest.fn();

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    (global.fetch as jest.Mock).mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  describe('generate', () => {
    it('should return error if prompt is empty', async () => {
      const result = await service.generate({ prompt: '' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Prompt requerido');
    });

    it('should generate images successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        arrayBuffer: () => Promise.resolve(Buffer.from('fake-image')),
      });

      const result = await service.generate({ prompt: 'test', quantity: 2 });
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it('should handle API error', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 503,
      });

      const result = await service.generate({ prompt: 'test' });
      expect(result.success).toBe(false);
    });
  });

  describe('not implemented', () => {
    it('edit returns not implemented', async () => {
      const result = await service.edit({});
      expect(result.success).toBe(false);
    });

    it('removeBackground returns not implemented', async () => {
      const result = await service.removeBackground({});
      expect(result.success).toBe(false);
    });

    it('upscale returns not implemented', async () => {
      const result = await service.upscale({});
      expect(result.success).toBe(false);
    });
  });
});
