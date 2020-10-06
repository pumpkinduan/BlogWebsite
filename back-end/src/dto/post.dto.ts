import { commentDto } from './comment.dto';
import { ApiProperty, PickType } from "@nestjs/swagger";
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
	export interface basicPostInterface extends basicPostString, basicPostNumber { }
	// 文章详情
	export interface detailPostInterface extends basicPostInterface {
		status: STATUS;
		author?: string;
		content: string;
		description: string;
		tags: string[];
		comments: commentDto.basicCommentDto[]; // 一篇文章下关联的留言，与留言为一对多关系
	}
	export type createPostInterface = Pick<
		detailPostInterface,
		| 'content'
		| 'description'
		| 'tags'
		| 'status'
		| 'author'
		| 'title'
		| 'coverUrl'
	>;
	export type updatePostInterface = createPostInterface;
}
// 用户后端，生成swagger api文档
export namespace PostDto {
	export class basicPostDto implements PostInterface.basicPostInterface {
		id: string;
		@ApiProperty({ description: '封面地址' })
		coverUrl: string;
		@ApiProperty({ description: '标题' })
		title: string;
		@ApiProperty({ description: '创建时间' })
		createdAt: string;
		@ApiProperty({ description: '获赞数' })
		likes: number;
		@ApiProperty({ description: '访客数' })
		visitors: number;
		@ApiProperty({ description: '下载次数' })
		downloads: number;
	}
	export class detailPostDto extends basicPostDto {
		@ApiProperty({ description: '状态', enum: PostInterface.STATUS })
		status: PostInterface.status[];
		@ApiProperty({ description: '作者' })
		author?: string;
		@ApiProperty({ description: '内容，html字符串格式' })
		content: string;
		@ApiProperty({ description: '描述' })
		description: string;
		@ApiProperty({ description: '标签' })
		tags: string[];
		@ApiProperty({ description: '留言' })
		comments: commentDto.basicCommentDto[]; // 一篇文章下关联的留言，与留言为一对多关系
	}
	export class createPostDto extends PickType(detailPostDto, ['content', 'description', 'tags', 'author', 'status', 'coverUrl', 'title']) { }
	export class updatePostDto extends createPostDto { }
}
