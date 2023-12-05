import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConstants } from './constants';
import { extractTokenFromCookies } from './utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extractTokenFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  // TODO: check payload
  async validate(payload: { userId: string; guest: boolean }) {
    return { userId: payload.userId };
  }
}
