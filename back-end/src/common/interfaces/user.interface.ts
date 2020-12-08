// 后台管理系统的用户表，有控制编辑查看的权限
type userId = string;
type postId = string;

export enum USER_TYPE {
  NORMAL = 'normal',
  ADMIN = 'admin',
}
export namespace UserInterface {
  export interface NORMAL extends Record<'username' | 'email', string> {
    id: string;
    type: USER_TYPE.NORMAL;
    webUrl: string;
  }
  export interface AdminProfiles {
    nickname: string;
    github: string;
    brief: string;
    notice?: string;
  }
  export interface ADMIN extends Record<'username' | 'email', string> {
    type: USER_TYPE.ADMIN;
    profiles?: AdminProfiles;
    moment_ids?: postId[]; // 文章id
    word_ids?: userId[]; // 给我的留言id
  }
  export interface CreateUser
    extends Pick<NORMAL, 'username' | 'email' | 'type' | 'webUrl'> {
    password: string;
  }
}
