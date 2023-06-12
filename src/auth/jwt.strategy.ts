import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  private static extractJwtFromCookie(req: Request) {
    return req.cookies['access_token'];
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      phoneNumber: payload.phoneNumber
    };
  }
}
