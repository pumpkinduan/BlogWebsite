import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'common/dto/index.dto';
import { AuthService } from 'module/auth/auth.service';
import { ResultInterface } from 'common/interfaces/result.interface';
@Controller()
@ApiTags('默认')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiProperty({ description: '注册' })
  @Post('register')
  async register(
    @Body() loginDto: UserDto.CreateUserDto,
  ): Promise<ResultInterface> {
    return await this.authService.register(loginDto);
  }

  // @ApiProperty({ description: '登录' })
  // @Post('login')
  // async login(
  // 	@Body() loginDto: UserDto.CreateUserDto,
  // ): Promise<ResultInterface> {
  // 	return await this.authService.basicUserLogin(loginDto);
  // }

  // @ApiProperty({ description: '管理员登录' })
  // @UseGuards(AuthGuard('jwt')) // 采用本地策略
  // @Post('admin/login')
  // async adminLogin(
  // 	@Body() loginDto: UserDto.AdminLoginDto,
  // ): Promise<any> {
  // 	return await this.authService.adminLogin(loginDto);
  // }
}
