import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'module/auth/auth.service';
import { User } from 'entity';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        // NOTE Passport 根据从 validate() 方法返回的值自动创建一个 user 对象，并将其作为 req.user 分配给请求对象
        const user = await this.authService.validateUser({ username, password });
        if (!user) {
            throw new UnauthorizedException({ message: '用户名或密码错误' });
        }
        return user;
    }
}
