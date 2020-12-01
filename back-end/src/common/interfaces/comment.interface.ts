import { UserInterface, PostInterface } from './index.interface';
export namespace CommentInterface {
    export interface BasicComment {
        id: string;
        content: string;
        createdAt: string;
        user: UserInterface.NORMAL; // 留言关联的用户，与用户为一对多关系
        children: BasicComment[] // 回复
        post: PostInterface.BasicPost
    }
    export type CreateComment = Pick<BasicComment, 'content' | 'user'>
}
