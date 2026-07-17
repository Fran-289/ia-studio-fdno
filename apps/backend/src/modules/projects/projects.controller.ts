import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Req() req: any) {
    return this.projectsService.findAll(req.user.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.findOne(id, req.user.sub);
  }

  @Post()
  async create(@Req() req: any, @Body() data: { name: string; type: string }) {
    return this.projectsService.create(req.user.sub, data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Req() req: any, @Body() data: any) {
    return this.projectsService.update(id, req.user.sub, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.delete(id, req.user.sub);
  }

  @Post(':id/duplicate')
  async duplicate(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.duplicate(id, req.user.sub);
  }
}
