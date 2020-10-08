import { CommentInterface } from './comment.interface';
type basicPostString = Record<'coverUrl' | 'title' | 'createdAt' | 'id', string>;
type basicPostNumber = Record<
    'likes' | 'visitors' | 'downloads',
    number
>;
// 可用于前后端 
export namespace PostInterface {
    // 文章状态
    export type status = 'published' | 'drafted' | 'updated' | 'deleted';
    export enum STATUS {
        PUBLISHED = 'published',
        DRAFTED = 'drafted',
        UPDATED = 'updated',
        DELETED = 'deleted'
    }
    // 文章列表
    export interface BasicPost extends basicPostString, basicPostNumber { }
    // 文章详情
    export interface DetailPost extends BasicPost {
        status: status;
        author?: string;
        content: string;
        description: string;
        tags: string[];
        comments: CommentInterface.BasicComment[]; // 一篇文章下关联的留言，与留言为一对多关系
    }
    export type CreatePost = Pick<
        DetailPost,
        | 'content'
        | 'description'
        | 'tags'
        | 'status'
        | 'author'
        | 'title'
        | 'coverUrl'
    >;
    export type UpdatePost = CreatePost;
}