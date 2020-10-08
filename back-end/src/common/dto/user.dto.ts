import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { UserInterface } from 'common/interfaces/index.interface'
// 管理员DTO
export namespace UserDto {
    export class BasicUserDto implements UserInterface.BasicUser {
        @ApiProperty({ description: '邮箱' })
        readonly email: string;
        @ApiProperty({ description: '头像地址' })
        readonly avatar: string;
        @ApiPropertyOptional({ description: '用户级别', default: UserInterface.ROLE.BasicUser, enum: UserInterface.ROLE, required: false })
        readonly role: UserInterface.ROLE
        @ApiProperty({ description: '用户昵称' })
        readonly nickname: string;
        @ApiProperty({ description: '用户id' })
        readonly id: string;
        @ApiProperty({ description: '用户关联的留言ids' })
        readonly comment_ids: string[]; // 用户关联的留言，与留言为一对多关系
        @ApiProperty({ description: '用户关联的文章ids' })
        readonly related_post_ids: string[]; // 用户关联的文章，与文章为多对多关系
    }
    export class SuperUserDto implements UserInterface.SuperUser {
        @ApiProperty({ description: '用户级别' })
        readonly role: UserInterface.ROLE
        readonly profiles?: UserInterface.SuperUserProfile;
        @ApiProperty({ description: '我发布的文章的id' })
        readonly moment_ids?: string[];
        @ApiProperty({ description: '给我的留言id' })
        readonly word_ids?: string[];
    }
    export class CreateUserDto
        extends PickType(BasicUserDto, ['nickname', 'email', 'role']) {
        @ApiProperty({ description: '密码' })
        readonly password: string;
    }

}

