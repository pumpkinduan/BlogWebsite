import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'module/user/user.module'

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './constants'
import { CryptoUtil } from 'utils/crypto';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn }
  })],
  providers: [AuthService, JwtStrategy, CryptoUtil],
  exports: [AuthService]
})
export class AuthModule { }
