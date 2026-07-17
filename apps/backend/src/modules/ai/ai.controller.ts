import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ImageService } from './services/image.service';
import { VideoService } from './services/video.service';
import { VoiceService } from './services/voice.service';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(
    private readonly imageService: ImageService,
    private readonly videoService: VideoService,
    private readonly voiceService: VoiceService,
  ) {}

  @Post('images/generate')
  async generateImage(@Body() body: any) {
    return this.imageService.generate(body);
  }

  @Post('images/edit')
  async editImage(@Body() body: any) {
    return this.imageService.edit(body);
  }

  @Post('images/remove-background')
  async removeBackground(@Body() body: any) {
    return this.imageService.removeBackground(body);
  }

  @Post('images/upscale')
  async upscaleImage(@Body() body: any) {
    return this.imageService.upscale(body);
  }

  @Post('videos/generate')
  async generateVideo(@Body() body: any) {
    return this.videoService.generate(body);
  }

  @Post('videos/edit')
  async editVideo(@Body() body: any) {
    return this.videoService.edit(body);
  }

  @Post('voice/text-to-speech')
  async textToSpeech(@Body() body: any) {
    return this.voiceService.textToSpeech(body);
  }

  @Post('voice/clone')
  async cloneVoice(@Body() body: any) {
    return this.voiceService.clone(body);
  }

  @Post('voice/translate')
  async translateVoice(@Body() body: any) {
    return this.voiceService.translate(body);
  }
}
