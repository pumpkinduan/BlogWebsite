import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserInterface, CommentInterface, PostInterface } from 'common/interfaces/index.interface'
import { IsDefined, IsEnum, IsString } from 'class-validator'
// 管理员DTO
export namespace UserDto {
    export class BasicUserDto {
        @ApiProperty({ description: '邮箱' })
        readonly email: string;
        @ApiPropertyOptional({ description: '用户级别', default: UserInterface.ROLE.BasicUser, enum: UserInterface.ROLE, required: false })
        readonly role: UserInterface.ROLE
        @ApiProperty({ description: '用户昵称' })
        readonly nickname: string;
        @ApiProperty({ description: '用户id' })
        readonly id: string;
        @ApiProperty({ description: '用户关联的文章ids' })
        readonly posts: PostInterface.BasicPost[]; // 用户关联的文章，与文章为多对多关系
        readonly comments: CommentInterface.BasicComment[]; // 用户关联的留言，与留言为一对多关系
    }


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
        @IsEnum(UserInterface.ROLE)
        @ApiProperty({ description: '用户级别', enum: UserInterface.ROLE })
        readonly role: UserInterface.ROLE

        @IsDefined()
        @IsString()
        @ApiProperty({ description: '用户的网址' })
        @IsDefined()
        readonly webUrl: string

        @ApiProperty({ description: '登录密码' })
        readonly password: string; // 普通用户不需要密码
    }


}

