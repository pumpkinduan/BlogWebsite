import { Body, Controller, Delete, Query, Get, HttpStatus, Param, Post, Inject, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UserDto } from "common/dto/index.dto";
import { ResultInterface, SuccessMessage, TYPE } from 'common/interfaces/index.interface'
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
        @Query('type', new ParseIntPipe()) type: TYPE
    ): Promise<ResultInterface> {
        const data = await this.userRepository.findAndCount(page, pageSize, type);
        data[0].forEach((user) => {
            if (type === TYPE.BasicUser) {
                // 普通用户没有 该字段
                Reflect.deleteProperty(user, 'password');
                Reflect.deleteProperty(user, 'profiles');
            }
            if (type === TYPE.SuperUser) {
                Reflect.deleteProperty(user, 'webUrl');
            }
        })
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
        if (createUserDto.type === TYPE.BasicUser) {
            // 创建普通用户
            Reflect.deleteProperty(data, 'password');
            Reflect.deleteProperty(data, 'profiles');
        }
        if (createUserDto.type === TYPE.SuperUser) {
            // 创建超级用户
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
