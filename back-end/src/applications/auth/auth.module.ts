import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'applications/user/user.module'
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy'
import { JWT } from 'src/consts'
import { CryptoUtil } from 'utils/crypto';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: JWT.secret,
    signOptions: { expiresIn: JWT.expiresIn }
  })],
  providers: [AuthService, JwtStrategy, CryptoUtil],
  exports: [AuthService]
})
export class AuthModule { }
