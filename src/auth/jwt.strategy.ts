//src/auth/jwt.strategy.ts
/**
 * The JWT strategy handles authenticating requests using a JWT.
 * It is used by Passport to authenticate the user making the request.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * The JWT strategy constructor.
   * @param usersService The users service used to retrieve the user from the database.
   */
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    });
  }

  /**
   * The function that is called by Passport to validate the JWT.
   * @param payload The payload of the JWT.
   * @returns The user that the JWT represents.
   */
  async validate(payload: { userId: string }) {
    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
