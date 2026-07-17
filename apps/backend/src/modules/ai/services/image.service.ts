import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async generate(params: any) {
    const { prompt, negativePrompt, style, model, quantity = 1 } = params;

    if (!this.openai) {
      return { success: false, error: 'OPENAI_API_KEY no configurada' };
    }

    try {
      const size = this.mapAspectRatio(params.aspectRatio);
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: negativePrompt ? `${prompt}. Avoid: ${negativePrompt}` : prompt,
        n: Math.min(quantity, 4),
        size,
        quality: 'standard',
        response_format: 'b64_json',
      });

      const imageData = response.data || [];
      const images = imageData.map((img, i) => ({
        id: `img-${Date.now()}-${i}`,
        b64_json: img.b64_json,
        prompt,
        style,
      }));

      return { success: true, data: images };
    } catch (error: any) {
      this.logger.error(`OpenAI generation failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async edit(params: any) {
    return { success: false, error: 'Edición de imágenes no implementada aún' };
  }

  async removeBackground(params: any) {
    return { success: false, error: 'Eliminación de fondo no implementada aún' };
  }

  async upscale(params: any) {
    return { success: false, error: 'Upscaling no implementado aún' };
  }

  private mapAspectRatio(ratio?: string): '1024x1024' | '1792x1024' | '1024x1792' {
    switch (ratio) {
      case '16:9': return '1792x1024';
      case '9:16': return '1024x1792';
      default: return '1024x1024';
    }
  }
}
