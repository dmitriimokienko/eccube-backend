import {
  ExecutionContext,
  // ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<User>(
    err: string,
    user: User,
    // info: any,
    // context: ExecutionContext,
    // status?: any,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // const { isGuest } = user;
    // if (isGuest) {
    //   const isPublic = this.reflector.getAllAndOverride<boolean>(
    //     IS_PUBLIC_KEY,
    //     [context.getHandler(), context.getClass()],
    //   );
    //   if (!isPublic) {
    //     throw new UnauthorizedException();
    //   }
    // }

    return user;
  }
}
