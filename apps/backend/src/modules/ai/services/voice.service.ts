import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class VoiceService {
  private readonly logger = new Logger(VoiceService.name);

  async textToSpeech(params: any) {
    const { text } = params;

    if (!text) {
      return { success: false, error: 'Texto requerido' };
    }

    try {
      // Google Translate TTS - gratuito, sin API key, funciona en español
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text.slice(0, 200))}&tl=es&client=tw-ob`;

      const response = await fetch(url);
      if (!response.ok) {
        return { success: false, error: 'TTS temporalmente no disponible' };
      }

      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');

      return {
        success: true,
        data: {
          audio: base64,
          contentType: 'audio/mpeg',
          duration: Math.ceil(text.length / 15),
        },
      };
    } catch (error: any) {
      this.logger.error(`TTS failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async clone(params: any) {
    return { success: false, error: 'Clonación de voz no disponible en versión gratuita' };
  }

  async translate(params: any) {
    return { success: false, error: 'Traducción de voz no disponible en versión gratuita' };
  }
}
