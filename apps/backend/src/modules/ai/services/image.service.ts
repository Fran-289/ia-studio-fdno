import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  async generate(params: any) {
    const { prompt, style, quantity = 1 } = params;

    if (!prompt) {
      return { success: false, error: 'Prompt requerido' };
    }

    try {
      const results = [];

      for (let i = 0; i < Math.min(quantity, 4); i++) {
        const response = await fetch(
          `https://pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
          {
            method: 'GET',
            headers: { 'Accept': 'image/*' },
          },
        );

        if (!response.ok) {
          return { success: false, error: `Error al generar imagen: ${response.status}` };
        }

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');

        results.push({
          id: `img-${Date.now()}-${i}`,
          b64_json: base64,
          contentType: 'image/jpeg',
          prompt,
          style,
        });
      }

      return { success: true, data: results };
    } catch (error: any) {
      this.logger.error(`Image generation failed: ${error.message}`);
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
}
