// 后台管理系统的用户表，有控制编辑查看的权限
type userId = string;
type postId = string;

export enum TYPE {
    BasicUser,
    SuperUser
}
export namespace UserInterface {
    export interface BasicUser
        extends Record<'nickname' | 'email', string> {
        id: string;
        type: TYPE.BasicUser;
    }
    export interface SuperUserProfile extends Pick<BasicUser, 'nickname' | 'email'> {
        github: string;
        brief: string;
        notice?: string;
    }
    export interface SuperUser {
        type: TYPE.SuperUser;
        profiles?: SuperUserProfile;
        moment_ids?: postId[]; // 文章id
        word_ids?: userId[]; // 给我的留言id
    }
    export interface CreateUser extends Pick<BasicUser, 'nickname' | 'email' | 'type'> {
        password: string;
    }
}

