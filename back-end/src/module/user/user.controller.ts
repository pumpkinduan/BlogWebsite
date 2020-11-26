import { Body, Controller, Delete, Query, Get, HttpStatus, Param, Post, Inject, ValidationPipe } from '@nestjs/common';
import { UserDto } from "common/dto/index.dto";
import { ResultInterface, UserInterface, SuccessMessage } from 'common/interfaces/index.interface'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'module/user/user.service'
@Controller('users')
@ApiTags('用户群')
export class UserController {
    constructor(
        @Inject(UserService) readonly userRepository: UserService,
    ) { }
    @ApiOperation({ description: '获取用户, 根据role来获取对应的用户类型' })
    @Get()
    async getBasicUsers(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
        @Query('role') role: UserInterface.ROLE
    ): Promise<ResultInterface> {
        const data = await this.userRepository.findAndCount(page, pageSize, role)
        return {
            statusCode: HttpStatus.OK,
            success: true,
            data: data
        }
    }

    @ApiOperation({ description: '创建用户, 管理员或普通用户' })
    @Post('/create')
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: UserDto.CreateUserDto): Promise<ResultInterface> {
        const data = await this.userRepository.create(createUserDto);
        if (createUserDto.role === UserInterface.ROLE.BasicUser) {
            // 创建普通用户
            Reflect.deleteProperty(data, 'password');
            Reflect.deleteProperty(data, 'profiles');
        }
        if (createUserDto.role === UserInterface.ROLE.SuperUser) {
            // 创建普通用户
            Reflect.deleteProperty(data, 'webUrl');
        }
        return {
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.CREATE,
            data: data,
            success: true
        }
    }

    @ApiOperation({ description: '删除用户' })
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<ResultInterface> {
        await this.userRepository.deleteById(id);
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.DELETE
        }
    }
}
