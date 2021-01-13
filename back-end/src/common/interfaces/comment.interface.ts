type User = {
    id: string;
    username: string;
}
type Reply = Pick<CommentInterface.BasicComment, 'id' | 'createdAt' | 'content'> & { targetUser: User; sourceUser: User };
export namespace CommentInterface {
    export interface BasicComment {
        id: string;
        content: string;
        createdAt: string;
        replies: Reply[];
        sourceUser: User;
    }
    export type CreateComment = {
        content: string;
        postId: string
    }
}
