import { Body, Controller, Delete, Query, Get, HttpStatus, Param, Post, Inject, ValidationPipe, Put, UseGuards } from '@nestjs/common';
import { UserDto } from "common/dto/index.dto";
import { ResultInterface, SuccessMessage, USER_TYPE } from 'common/interfaces/index.interface'
import { ApiOperation, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service'
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
@ApiTags('用户群')
export class UserController {
    constructor(
        @Inject(UserService) readonly userRepository: UserService,
    ) { }
    @ApiOperation({ description: '获取用户, 根据role来获取对应的用户类型' })
    @ApiQuery({ name: 'page', })
    @ApiQuery({ name: 'pageSize' })
    @ApiQuery({ name: 'type', enum: USER_TYPE })
    @Get()
    async getUsers(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
        @Query('type') type: USER_TYPE
    ): Promise<ResultInterface> {
        const data = await this.userRepository.findAndCount(page, pageSize, type);
        return {
            statusCode: HttpStatus.OK,
            success: true,
            data: data
        }
    }

    @ApiOperation({ description: '创建用户, 管理员或普通用户' })
    @Post('/create')
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: UserDto.CreateUserDto): Promise<ResultInterface> {
        await this.userRepository.create(createUserDto);
        return {
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.CREATE,
            success: true
        }
    }

    @ApiOperation({ description: '更新管理员信息' })
    @Put('admin/:id')
    async updateAdminProfiles(@Param('id') id: string, @Body(new ValidationPipe()) updateAdminProfilesDto: UserDto.UpdateAdminProfilesDto): Promise<ResultInterface> {
        await this.userRepository.updateAdminProfiles(id, updateAdminProfilesDto);
        return {
            success: true,
            statusCode: 200,
            message: SuccessMessage.User.OK
        }

    }

    @ApiOperation({ description: '删除用户' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
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
