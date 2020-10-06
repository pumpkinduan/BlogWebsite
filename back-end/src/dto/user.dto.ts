// 管理员DTO
type notice = { notice: string };
export namespace userDto {
    export type superUserProfile = Record<
        'nickname' | 'email' | 'github' | 'avatar' | 'brief',
        string
    >;
    export interface superUserDto {
        profiles: superUserProfile & notice;
        moment_ids: number[]; // 文章id
        word_ids: number[]; // 给我的留言id
    }
    export interface basicUserDto
        extends Pick<superUserProfile, 'nickname' | 'email' | 'avatar'> {
        id: number;
        comment_ids: number[]; // 用户关联的留言，与留言为一对多关系
        related_post_ids: number[]; // 用户关联的文章，与文章为多对多关系
    }
    export interface createUserDto
        extends Pick<superUserProfile, 'nickname' | 'email'> {
        password: string;
    }
    export interface createSuperUserDto {
        username: string;
        password: string;
    }
}
