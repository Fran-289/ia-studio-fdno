import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly imageService: ImageService,
    private readonly videoService: VideoService,
    private readonly voiceService: VoiceService,
  ) {}
}
