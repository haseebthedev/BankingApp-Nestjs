import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<User> {
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid token provided');
    }

    return user;
  }
}
