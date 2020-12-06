import {
    ConflictException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from 'module/user/user.service';
import { User } from 'entity';
import { UserDto } from 'common/dto/index.dto';
import { JwtService } from '@nestjs/jwt';
import {
    ResultInterface,
    SuccessMessage,
} from 'common/interfaces/result.interface';
import { CryptoUtil } from 'utils/crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly cryptoUtil: CryptoUtil,
    ) { }

    async validateUser(payload: any): Promise<User | null> {
        const user = await this.userService.findOneByUserName(payload.username);
        if (user && user.password === payload.password) {
            return user;
        }
        return null;
    }

    async register(registerDto: UserDto.CreateUserDto): Promise<ResultInterface> {
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

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.CREATE,
        };
    }

    async login(loginDto: UserDto.CreateUserDto): Promise<ResultInterface> {
        const user = await this.userService.findOneByUserName(loginDto.username);
        if (user) throw new NotFoundException('该用户不存在');

        const result = {
            statusCode: HttpStatus.OK,
            success: true,
        };

        if (user)
            return {
                data: user,
                message: SuccessMessage.User.OK,
                ...result,
            };

        // 创建一个新的用户
        const new_user = await this.userService.create(loginDto);
        return {
            data: new_user,
            message: SuccessMessage.User.CREATE,
            ...result,
        };
    }

    // async adminLogin(loginDto: UserDto.AdminLoginDto): Promise<{ accessToken: string }> {
    //     const payload = { username: loginDto.username, password: loginDto.password };
    //     const accessToken = await this.jwtService.sign(payload);
    //     return {
    //         accessToken
    //     }
    // }
}
