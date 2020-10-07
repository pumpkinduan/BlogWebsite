import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from "dto/index.dto";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { exampleInstance } from "example";
@Controller('users')
@ApiTags('用户群')
export class UserController {
    @ApiOperation({ description: '获取所有普通用户' })
    @Get('/basic')
    getUsers(): UserDto.BasicUserDto[] {
        return [exampleInstance.basicUser]
    }

    @ApiOperation({ description: '获取所有管理员' })
    @Get('super')
    getSuperUsers(): UserDto.SuperUserDto[] {
        return [exampleInstance.superUser]
    }

    @ApiOperation({ description: '创建用户, 管理员或普通用户' })
    @Post('/create')
    createUser(@Body() createUserDto: UserDto.CreateUserDto): UserDto.BasicUserDto | UserDto.SuperUserDto | any {
        if (createUserDto.role === UserDto.ROLE.BasicUser) {
            return exampleInstance.basicUser;
        }
        if (createUserDto.role === UserDto.ROLE.SuperUser) {
            return exampleInstance.superUser;
        }
        return {
            success: false,
            error: '参数错误'
        }
    }

    @ApiOperation({ description: '删除普通用户' })
    @Delete(':id')
    deleteUser(@Param() id: string) {
        return {
            success: true
        }
    }
}
