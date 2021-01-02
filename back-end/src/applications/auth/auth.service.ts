import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from 'applications/user/user.service';
import { User } from 'entities';
import { UserDto } from 'common/dto/index.dto';
import { JwtService } from '@nestjs/jwt';
import { CryptoUtil, validateEmail, validateUserName } from 'utils/index.util';

interface PayloadInterface {
    email: string;
    id: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly cryptoUtil: CryptoUtil,
    ) { }
    async createToken(payload: PayloadInterface) {
        return await this.jwtService.sign(payload);
    }

    async validateUser(payload: PayloadInterface): Promise<User> {
        return await this.userService.findOneByEmail(payload.email);

    }

    async register(registerDto: UserDto.CreateUserDto) {
        const res_email = validateEmail(registerDto.email);
        const res_username = validateUserName(registerDto.username);

        if (!res_email.status) {
            throw new BadRequestException(res_email.msg)
        }
        if (!res_username.status) {
            throw new BadRequestException(res_username.msg)
        }
        const existing_user = await this.userService.findOneByUserName(
            registerDto.username,
        );

        if (existing_user) throw new ConflictException('用户名或邮箱已存在');

        const existing_email = await this.userService.findOneByEmail(
            registerDto.email,
        );

        if (existing_email) throw new ConflictException('用户名或邮箱已存在');

        registerDto.password = this.cryptoUtil.encryptPassword(registerDto.password);

        await this.userService.create(registerDto);


    }

    async login(loginDto: UserDto.LoginDto) {
        const user = await this.userService.findOneByEmail(loginDto.email);

        if (!user) throw new NotFoundException('该用户名或邮箱号不存在');

        const accessToken = await this.createToken({ email: user.email, id: user.id });

        if (!this.cryptoUtil.validatePassword(loginDto.password, user.password)) {

            throw new NotFoundException('密码错误，请重新输入');
        }
        return {
            accessToken
        };
    }
}
