// 后台管理系统的用户表，有控制编辑查看的权限
type userId = string;
type postId = string;

export enum USER_TYPE {
  NORMAL,
  ADMIN,
}
export namespace UserInterface {
  export interface NORMAL extends Record<'username' | 'email', string> {
    id: string;
    type: USER_TYPE.NORMAL;
  }
  export interface AdminProfile extends Pick<NORMAL, 'username' | 'email'> {
    github: string;
    brief: string;
    notice?: string;
  }
  export interface ADMIN {
    type: USER_TYPE.ADMIN;
    profiles?: AdminProfile;
    moment_ids?: postId[]; // 文章id
    word_ids?: userId[]; // 给我的留言id
  }
  export interface CreateUser
    extends Pick<NORMAL, 'username' | 'email' | 'type'> {
    password: string;
  }
}
