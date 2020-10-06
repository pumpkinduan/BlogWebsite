import { commentDto } from './comment.dto';
type basicPostString = Record<'coverUrl' | 'title' | 'createdAt', string>;
type basicPostNumber = Record<
	'likes' | 'visitors' | 'id' | 'downloads',
	number
>;

export namespace PostDto {
	// 文章状态
	export type status = 'published' | 'drafted' | 'updated' | 'deleted';
	// 文章列表
	export interface basicPostDto extends basicPostString, basicPostNumber { }

	// 文章详情
	export interface detailPostDto extends basicPostDto {
		status: status[];
		author?: string;
		content: string; // 文章内容，格式为html字符串
		description: string;
		tags: string[];
		comments: commentDto.basicCommentDto[]; // 一篇文章下关联的留言，与留言为一对多关系
	}
	export type createPostDto = Pick<
		detailPostDto,
		| 'content'
		| 'description'
		| 'tags'
		| 'status'
		| 'author'
		| 'title'
		| 'coverUrl'
	>;
}
