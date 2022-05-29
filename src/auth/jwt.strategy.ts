import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import constants from '../constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private readonly userService: UserService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
      usernameField: 'email'
    });
  }

  async validate(payload: any) {
    // this.userService.getUserProfile
    console.log("--->", payload.user);
    const user = await this.userService.getUserProfile(payload.user.email);
    console.log(user.role);
    return { ...payload.user };
  }
}
