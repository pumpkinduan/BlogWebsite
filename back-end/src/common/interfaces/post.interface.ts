import { CommentInterface } from 'common/interfaces/index.interface'
type basicPostString = Record<'coverUrl' | 'title' | 'createdAt' | 'id' | 'category' | 'description' | 'author', string>;
type basicPostNumber = Record<
    'likes' | 'totalComments' | 'browsers',
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
    export interface BasicPost extends basicPostString, basicPostNumber {
        tags: string[];
        status: status;
    }
    // 文章详情
    export interface DetailPost extends BasicPost {
        content: string;
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

    export type Category = { category: string, count: number }

    export type Archive = {
        fullyear: number;
        lists: {
            month: number;
            count: number;
            items: {
                id: number;
                title: string;
            }[]
        }[]
    }
}