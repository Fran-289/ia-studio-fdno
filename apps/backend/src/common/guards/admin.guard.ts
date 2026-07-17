import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AdminService } from '../../modules/admin/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new ForbiddenException('No autenticado');

    const isAdmin = await this.adminService.isAdmin(user.sub);
    if (!isAdmin) throw new ForbiddenException('Acceso solo para administradores');

    return true;
  }
}
