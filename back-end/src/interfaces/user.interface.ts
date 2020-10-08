export namespace UserInterface {
    export enum ROLE {
        BasicUser = 'basic',
        SuperUser = 'super'
    }
    export interface BasicUser
        extends Record<'nickname' | 'email' | 'avatar', string> {
        id: string;
        role: ROLE.BasicUser;
        comment_ids: string[]; // 用户关联的留言，与留言为一对多关系
        related_post_ids: string[]; // 用户关联的文章，与文章为多对多关系
    }
    export interface SuperUserProfile extends Pick<BasicUser, 'nickname' | 'email' | 'avatar'> {
        github: string;
        brief: string;
        notice?: string;
    }
    export interface SuperUser {
        role: ROLE.SuperUser;
        profiles: SuperUserProfile;
        moment_ids: string[]; // 文章id
        word_ids: string[]; // 给我的留言id
    }
    export interface CreateUser extends Pick<BasicUser, 'nickname' | 'email' | 'role'> {
        password: string;
    }
}
