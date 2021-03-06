import { Body, Controller, Delete, Query, Get, HttpStatus, Param, Post, Inject, Put, UseGuards, Request } from '@nestjs/common';
import { UserDto } from "common/dto/index.dto";
import { ResultInterface, SuccessMessage, USER_TYPE } from 'common/interfaces/index.interface';
import { ApiOperation, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/index.guard'
@Controller('users')
@ApiTags('用户群')
export class UserController {
    constructor(
        @Inject(UserService) readonly userRepository: UserService,
    ) { }

    @ApiOperation({ description: '获取用户, 根据role来获取对应的用户类型' })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'pageSize', example: 10 })
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

    @ApiOperation({ description: '获取指定用户信息' })
    @Get('/profile')
    @ApiBearerAuth()
    @UseGuards(new JwtAuthGuard())
    async getUserProfile(
        @Request() req
    ): Promise<ResultInterface> {
        const data = await this.userRepository.findOneById(req.user.id);
        return {
            statusCode: HttpStatus.OK,
            success: true,
            data
        }
    }

    @ApiOperation({ description: '创建用户, 管理员或普通用户' })
    @Post('/create')
    async createUser(@Body() createUserDto: UserDto.CreateUserDto): Promise<ResultInterface> {
        await this.userRepository.create(createUserDto);
        return {
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.CREATE,
            success: true
        }
    }


    @ApiOperation({ description: '更新管理员信息' })
    @Put('admin')
    @ApiBearerAuth()
    @UseGuards(new JwtAuthGuard())
    async updateAdminProfiles(@Body() updateAdminProfilesDto: UserDto.UpdateAdminProfilesDto, @Request() req): Promise<ResultInterface> {
        await this.userRepository.updateAdminProfiles(req.user.id, updateAdminProfilesDto);
        return {
            success: true,
            statusCode: 200,
            message: SuccessMessage.User.OK
        }

    }

    @ApiOperation({ description: '删除用户' })
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(new JwtAuthGuard())
    async deleteUser(@Param('id') id: number): Promise<ResultInterface> {
        await this.userRepository.deleteById(id);
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: SuccessMessage.User.DELETE
        }
    }
}