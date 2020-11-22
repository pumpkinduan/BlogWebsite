import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Inject, ValidationPipe } from '@nestjs/common';
import { UserDto } from "common/dto/index.dto";
import { ResultInterface, UserInterface, SuccessMessage } from 'common/interfaces/index.interface'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { exampleInstance } from "common/example";
import { UserService } from 'module/user/user.service'
@Controller('users')
@ApiTags('用户群')
export class UserController {
    constructor(
        @Inject(UserService) readonly userRepository: UserService,
    ) { }
    @ApiOperation({ description: '获取所有普通用户' })
    @Get('/basic')
    getUsers(): UserInterface.BasicUser[] {
        return []
    }

    @ApiOperation({ description: '获取所有管理员' })
    @Get('super')
    getSuperUsers(): UserInterface.SuperUser[] {
        return [exampleInstance.superUser]
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
        return {
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.CREATE,
            data: data,
            success: true
        }
    }

    @ApiOperation({ description: '删除用户' })
    @Delete(':id')
    async deleteUser(@Param() id: string): Promise<ResultInterface> {
        await this.userRepository.deleteById(id);
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.DELETE
        }
    }
}
