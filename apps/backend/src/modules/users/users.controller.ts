import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.sub);
  }

  @Put('profile')
  async updateProfile(
    @Req() req: any,
    @Body() data: { name?: string; avatar?: string },
  ) {
    return this.usersService.updateProfile(req.user.sub, data);
  }

  @Get('credits')
  async getCredits(@Req() req: any) {
    return this.usersService.getCredits(req.user.sub);
  }
}
