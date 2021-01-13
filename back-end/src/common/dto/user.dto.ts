import { ApiProperty } from '@nestjs/swagger';
import { UserInterface, USER_TYPE } from 'common/interfaces/index.interface';
import { IsDefined, IsEmail, IsEnum, IsOptional } from 'class-validator';

// 管理员DTO
export namespace UserDto {
    // 创建普通用户或管理员
    export class CreateUserDto {
        @IsDefined()
        @IsEmail()
        @ApiProperty({ description: '邮箱', example: '123@qq.com' })
        readonly email: string;

        @IsDefined()
        @ApiProperty({ description: '用户昵称' })
        readonly username: string;

        @IsDefined()
        @IsEnum(USER_TYPE)
        @ApiProperty({
            description: '用户类型',
            enum: [USER_TYPE.NORMAL, USER_TYPE.ADMIN],
        })
        readonly type: USER_TYPE;

        @IsOptional()
        @ApiProperty({ description: '博客地址', required: false })
        readonly webUrl?: string;

        @IsDefined()
        @ApiProperty({ description: '登录密码', example: '123@qq.com' })
        password: string;
    }
    export class LoginDto {
        @IsEmail()
        @ApiProperty({ description: '邮箱', example: '123@qq.com' })
        readonly email: string;

        @IsDefined()
        @ApiProperty({ description: '登录密码', example: '123@qq.com' })
        password: string;
    }
    export class UpdateAdminProfilesDto implements UserInterface.AdminProfiles {
        @IsDefined()
        @ApiProperty({ description: 'github地址', default: 'https://github.com/pumpkinduan', enum: ['https://github.com/pumpkinduan'] })
        github: string;

        @IsDefined()
        @ApiProperty({ description: '个人简介', enum: [''] })
        brief: string;

        @IsDefined()
        @ApiProperty({ description: '昵称', default: '伊内个南瓜瓜', enum: ['伊内个南瓜瓜'] })
        nickname: string;

        @IsOptional()
        @ApiProperty({ required: false, description: '公告', default: '个人博客网站2.0即将发布，期待ing......', enum: ['个人博客网站2.0即将发布，期待ing......'] })
        notice: string;

        @IsOptional()
        @ApiProperty({ description: '头像', required: false })
        avatar: string;
    }
}
