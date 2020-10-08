import { UserInterface } from './user.interface';
export namespace CommentInterface {
    export interface BasicComment {
        id: string;
        content: string;
        created_at: string;
        related_user: UserInterface.BasicUser; // 留言关联的用户，与用户为一对一关系
        children: BasicComment[] // 回复
        related_post_id: string;
    }
    export type CreateComment = Pick<BasicComment, 'content' | 'related_user' | 'related_post_id'>
}
