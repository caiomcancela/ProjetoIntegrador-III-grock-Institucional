// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/role.enum';
import { ROLES_KEY } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtém os cargos necessários a partir do decorator @Roles() na rota.
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota não exige nenhum cargo específico, permite o acesso.
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtém o objeto do utilizador que foi anexado à requisição pelo JwtAuthGuard.
    const { user } = context.switchToHttp().getRequest();

    // 3. Verifica se o cargo do utilizador está na lista de cargos permitidos.
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}