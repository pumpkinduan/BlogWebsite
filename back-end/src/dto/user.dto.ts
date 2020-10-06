import { ApiProperty, PickType } from "@nestjs/swagger";
// 管理员DTO
type notice = { notice: string };
export namespace userDto {
    export class superUserProfile {
        @ApiProperty({ description: '管理员的昵称' })
        nickname: string;
        @ApiProperty({ description: '邮箱' })
        email: string;
        @ApiProperty({ description: 'GitHub账号' })
        github: string;
        @ApiProperty({ description: '头像地址' })
        avatar: string;
        @ApiProperty({ description: '关于我，HTML格式的字符串' })
        brief: string;
    }
    export class superUserDto {
        profiles: superUserProfile & notice;
        moment_ids: number[]; // 文章id
        word_ids: number[]; // 给我的留言id
    }
    export class basicUserDto
        extends PickType(superUserProfile, ['nickname', 'email', 'avatar']) {
        id: number;
        comment_ids: number[]; // 用户关联的留言，与留言为一对多关系
        related_post_ids: number[]; // 用户关联的文章，与文章为多对多关系
    }
    export class createUserDto
        extends PickType(superUserProfile, ['nickname', 'email']) {
        @ApiProperty({ description: '密码' })
        password: string;
    }
    export class createSuperUserDto {
        @ApiProperty({ description: '管理员的昵称' })
        nickname: string;
        @ApiProperty({ description: '密码' })
        password: string;
    }
}

export namespace userInterface {
    export type superUserProfile = Record<
        'nickname' | 'email' | 'github' | 'avatar' | 'brief',
        string
    >;
    export interface superUserInterface {
        profiles: superUserProfile & notice;
        moment_ids: number[]; // 文章id
        word_ids: number[]; // 给我的留言id
    }
    export interface basicUserInterface
        extends Pick<superUserProfile, 'nickname' | 'email' | 'avatar'> {
        id: number;
        comment_ids: number[]; // 用户关联的留言，与留言为一对多关系
        related_post_ids: number[]; // 用户关联的文章，与文章为多对多关系
    }
    export interface createUserInterface
        extends Pick<superUserProfile, 'nickname' | 'email'> {
        password: string;
    }
    export interface createSuperUserInterface {

        username: string;
        password: string;
    }
}
