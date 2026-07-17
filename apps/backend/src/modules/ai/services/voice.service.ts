import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VoiceService {
  private readonly logger = new Logger(VoiceService.name);
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ELEVENLABS_API_KEY') || '';
  }

  async textToSpeech(params: any) {
    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM', stability, similarity } = params;

    if (!this.apiKey) {
      return { success: false, error: 'ELEVENLABS_API_KEY no configurada' };
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: stability ?? 0.5,
              similarity_boost: similarity ?? 0.75,
            },
          }),
        },
      );

      if (!response.ok) {
        const err = await response.text();
        return { success: false, error: `ElevenLabs error: ${err}` };
      }

      const audioBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(audioBuffer).toString('base64');

      return {
        success: true,
        data: {
          audio: base64,
          contentType: 'audio/mpeg',
          duration: 0,
        },
      };
    } catch (error: any) {
      this.logger.error(`ElevenLabs TTS failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async clone(params: any) {
    return { success: false, error: 'Clonación de voz no implementada aún' };
  }

  async translate(params: any) {
    return { success: false, error: 'Traducción de voz no implementada aún' };
  }
}
