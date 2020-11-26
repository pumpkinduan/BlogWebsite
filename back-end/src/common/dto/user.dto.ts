import { ApiProperty } from "@nestjs/swagger";
import { ROLE } from 'common/interfaces/index.interface'
import { IsDefined, IsEnum, IsString } from 'class-validator'
// 管理员DTO
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
        readonly nickname: string;

        @IsDefined()
        @IsEnum(ROLE)
        @ApiProperty({ description: '用户级别', enum: ROLE })
        readonly role: ROLE

        @IsDefined()
        @IsString()
        @ApiProperty({ description: '用户的网址' })
        @IsDefined()
        readonly webUrl: string

        @ApiProperty({ description: '登录密码' })
        readonly password?: string; // 普通用户不需要密码
    }


}

