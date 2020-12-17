import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'common/dto/index.dto';
import { AuthService } from 'applications/auth/auth.service';
import { ResultInterface, SuccessMessage } from 'common/interfaces/result.interface';
@Controller()
@ApiTags('默认')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) { }

    @Get('/')
    getHello(): string {
        return this.appService.getHello();
    }

    @ApiProperty({ description: '注册' })
    @Post('register')
    async register(
        @Body() loginDto: UserDto.CreateUserDto,
    ): Promise<ResultInterface> {
        await this.authService.register(loginDto);
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.CREATE,
        };
    }

    @ApiProperty({ description: '登录' })
    @Post('login')
    async login(
        @Body() loginDto: UserDto.LoginDto,
    ): Promise<ResultInterface> {
        await this.authService.login(loginDto);
        const payload = { account: loginDto.account, password: loginDto.password };
        const accessToken = await this.authService.createToken(payload);
        return {
            success: true,
            message: SuccessMessage.User.LOGIN,
            statusCode: HttpStatus.OK,
            data: {
                accessToken
            }
        }
    }
}
