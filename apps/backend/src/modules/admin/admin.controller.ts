import { Controller, Get, Put, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async listUsers() {
    const users = await this.adminService.listUsers();
    return { success: true, data: users.map((u: any) => {
      const { password, ...rest } = u;
      return rest;
    })};
  }

  @Put('users/:id/credits')
  async setCredits(@Param('id') id: string, @Body() body: { credits: number }) {
    return this.adminService.setCredits(id, body.credits);
  }

  @Put('users/:id/plan')
  async setPlan(@Param('id') id: string, @Body() body: { plan: string; credits: number }) {
    return this.adminService.setPlan(id, body.plan, body.credits);
  }
}
