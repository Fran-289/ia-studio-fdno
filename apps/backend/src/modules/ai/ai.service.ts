import { Injectable, Logger } from '@nestjs/common';
import { ImageService } from './services/image.service';
import { VideoService } from './services/video.service';
import { VoiceService } from './services/voice.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly imageService: ImageService,
    private readonly videoService: VideoService,
    private readonly voiceService: VoiceService,
  ) {}
}
