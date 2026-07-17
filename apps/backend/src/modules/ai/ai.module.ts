import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ImageService } from './services/image.service';
import { VideoService } from './services/video.service';
import { VoiceService } from './services/voice.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AiController],
  providers: [AiService, ImageService, VideoService, VoiceService],
  exports: [AiService],
})
export class AiModule {}
