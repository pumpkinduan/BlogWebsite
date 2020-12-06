import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from 'module/user/user.service';
import { User } from 'entity';
import { UserDto } from 'common/dto/index.dto';
import { JwtService } from '@nestjs/jwt';
import { CryptoUtil, validateEmail, validateUserName } from 'utils';

interface PayloadInterface {
    account: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly cryptoUtil: CryptoUtil,
    ) { }

    async getUser(account: string) {
        let user: User = null;
        if (validateUserName(account).status) {
            user = await this.userService.findOneByUserName(account);
        } else if (validateEmail(account).status) {
            user = await this.userService.findOneByUserName(account);
        }
        return user;
    }

    async createToken(payload: PayloadInterface) {
        return await this.jwtService.sign(payload);
    }

    async validateUser(payload: PayloadInterface): Promise<User | null> {
        return await this.getUser(payload.account);;
    }

    async register(registerDto: UserDto.CreateUserDto) {

        if (!validateEmail(registerDto.email).status || !validateUserName(registerDto.username).status) {
            throw new BadRequestException('用户名或邮箱格式不正确')
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
        const user = await this.getUser(loginDto.account);

        if (!user) throw new NotFoundException('该用户名或邮箱号不存在');

        if (!this.cryptoUtil.validatePassword(loginDto.password, user.password)) {
            throw new NotFoundException('密码错误，请重新输入');
        }
    }
}
