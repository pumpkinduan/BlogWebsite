import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from "common/dto/index.dto";
import { UserInterface } from 'common/interfaces/index.interface'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { exampleInstance } from "common/example";
@Controller('users')
@ApiTags('用户群')
export class UserController {
    @ApiOperation({ description: '获取所有普通用户' })
    @Get('/basic')
    getUsers(): UserInterface.BasicUser[] {
        return [exampleInstance.basicUser]
    }

    @ApiOperation({ description: '获取所有管理员' })
    @Get('super')
    getSuperUsers(): UserInterface.SuperUser[] {
        return [exampleInstance.superUser]
    }

    @ApiOperation({ description: '创建用户, 管理员或普通用户' })
    @Post('/create')
    createUser(@Body() createUserDto: UserDto.CreateUserDto): UserInterface.BasicUser | UserInterface.SuperUser | any {
        console.log(createUserDto);

        if (createUserDto.role === UserInterface.ROLE.BasicUser) {
            return exampleInstance.basicUser;
        }
        if (createUserDto.role === UserInterface.ROLE.SuperUser) {
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
        // return {
        //     success: true
        // }
    }
}
