import { ApiProperty } from '@nestjs/swagger';
import { UserInterface, USER_TYPE } from 'common/interfaces/index.interface';
import { IsDefined, IsEnum, IsString } from 'class-validator';

// 管理员DTO
type email = string
type username = string
export namespace UserDto {
    // 创建普通用户或管理员
    export class CreateUserDto {
        @IsDefined()
        @IsString()
        @ApiProperty({ description: '邮箱' })
        readonly email: string;

        @IsDefined()
        @IsString()
        @ApiProperty({ description: '用户昵称' })
        readonly username: string;

        @IsDefined()
        @IsEnum(USER_TYPE)
        @ApiProperty({
            description: '用户类型',
            enum: [USER_TYPE.NORMAL, USER_TYPE.ADMIN],
        })
        readonly type: USER_TYPE;

        @IsString()
        readonly webUrl?: string;

        @ApiProperty({ description: '登录密码' })
        password: string;
    }
    export class LoginDto {
        @IsDefined()
        @IsString()
        @ApiProperty({ description: '邮箱或用户名' })
        readonly account: email | username;

        @ApiProperty({ description: '登录密码' })
        password: string;
    }
    export class UpdateAdminProfilesDto implements UserInterface.AdminProfiles {
        @IsDefined()
        @IsString()
        @ApiProperty({ description: 'github地址', default: 'https://github.com/pumpkinduan', enum: ['https://github.com/pumpkinduan'] })
        github: string;

        @IsDefined()
        @IsString()
        @ApiProperty({ description: '个人简介', enum: [''] })
        brief: string;

        @IsDefined()
        @IsString()
        @ApiProperty({ description: '昵称', default: '伊内个南瓜瓜', enum: ['伊内个南瓜瓜'] })
        nickname: string;

        @ApiProperty({ description: '公告', default: '个人博客网站2.0即将发布，期待ing......', nullable: true, enum: ['个人博客网站2.0即将发布，期待ing......'] })
        notice?: string;
    }
}
