import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  constructor(private configService: ConfigService) {}

  async generate(params: any) {
    const provider = (params.model || '').toLowerCase();

    if (provider.includes('runway')) {
      return this.callRunway(params);
    }

    return {
      success: false,
      error: 'Generación de video requiere API key de Runway, Veo, Kling o Luma. Configura el proveedor e intenta de nuevo.',
    };
  }

  async edit(params: any) {
    return { success: false, error: 'Edición de video no implementada aún' };
  }

  private async callRunway(params: any) {
    const apiKey = this.configService.get<string>('RUNWAY_API_KEY');
    if (!apiKey) {
      return { success: false, error: 'RUNWAY_API_KEY no configurada' };
    }
    return { success: false, error: 'Integración con Runway pendiente' };
  }
}
