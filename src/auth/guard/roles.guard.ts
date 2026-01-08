import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Ler quais roles são exigidas na rota (ex: ['admin'])
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota não exige role nenhuma, deixa passar
    if (!requiredRoles) {
      return true;
    }

    // 2. Pegar o usuário que o JwtStrategy colocou no request
    const { user } = context.switchToHttp().getRequest();

    // 3. Verificar se o usuário tem a role necessária
    if (!user || !requiredRoles.includes(user.role)) {
       throw new ForbiddenException('Acesso negado: Você não tem permissão de administrador.');
    }

    return true;
  }
}