import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import constants from 'src/constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGaurd } from './jwt-auth.gaurd';

@Module({
  imports: [JwtModule.register({
    secret: constants.jwtSecret,
    signOptions: ({ expiresIn: '3000s'})
  }), forwardRef(() => UserModule)],
  providers: [AuthService, JwtStrategy, JwtAuthGaurd],
  exports: [AuthService]
})
export class AuthModule {}
