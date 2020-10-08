import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
// 管理员DTO
export namespace UserDto {
    export enum ROLE {
        BasicUser = 'basic',
        SuperUser = 'super'
    }

    export class BasicUserDto {
        @ApiProperty({ description: '邮箱' })
        email: string;
        @ApiProperty({ description: '头像地址' })
        avatar: string;
        @ApiPropertyOptional({ description: '用户级别', default: ROLE.BasicUser, enum: ROLE, required: false })
        role: ROLE.BasicUser
        @ApiProperty({ description: '用户昵称' })
        nickname: string;
        @ApiProperty({ description: '用户id' })
        id: string;
        @ApiProperty({ description: '用户关联的留言ids' })
        comment_ids: string[]; // 用户关联的留言，与留言为一对多关系
        @ApiProperty({ description: '用户关联的文章ids' })
        related_post_ids: string[]; // 用户关联的文章，与文章为多对多关系
    }
    export class SuperUserProfile extends PickType(BasicUserDto, ['email', 'avatar', 'nickname']) {
        @ApiProperty({ description: 'GitHub账号' })
        github: string;
        @ApiProperty({ description: '头像地址' })
        avatar: string;
        @ApiProperty({ description: '关于我，HTML格式的字符串' })
        brief: string;
        @ApiProperty({ description: '通知' })
        notice: string
    }
    export class SuperUserDto {
        @ApiProperty({ description: '用户级别' })
        role: ROLE.SuperUser
        profiles: SuperUserProfile;
        @ApiProperty({ description: '我发布的文章的id' })
        moment_ids: string[];
        @ApiProperty({ description: '给我的留言id' })
        word_ids: string[];
    }
    export class CreateUserDto
        extends PickType(BasicUserDto, ['nickname', 'email', 'role']) {
        @ApiProperty({ description: '密码' })
        password: string;
    }

}

