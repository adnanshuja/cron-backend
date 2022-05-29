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
    const user = await this.userService.getUserProfile(payload.user.email);
    const newPayload = { id: 0, name: '', email: '', role: '', permissions: []};
    newPayload.name = payload.user.name;
    newPayload.email = payload.user.email;
    newPayload.role = user[0].role.name;
    newPayload.permissions = user[0].role.permissions.map(permission => permission.name);
    return { ...newPayload };
  }
}
