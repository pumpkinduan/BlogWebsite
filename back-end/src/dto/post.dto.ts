import { CommentInterface, PostInterface } from 'interfaces/index.interface'
import { ApiProperty, PickType } from "@nestjs/swagger";
type basicPostString = Record<'coverUrl' | 'title' | 'createdAt' | 'id', string>;
type basicPostNumber = Record<
	'likes' | 'visitors' | 'downloads',
	number
>;
export namespace PostDto {
	export class BasicPostDto implements PostInterface.BasicPost {
		@ApiProperty({ description: '文章id' })
		readonly id: string;
		@ApiProperty({ description: '封面地址' })
		readonly coverUrl: string;
		@ApiProperty({ description: '标题' })
		readonly title: string;
		@ApiProperty({ description: '创建时间' })
		readonly createdAt: string;
		@ApiProperty({ description: '获赞数' })
		readonly likes: number;
		@ApiProperty({ description: '访客数' })
		readonly visitors: number;
		@ApiProperty({ description: '下载次数' })
		readonly downloads: number;
	}
	export class DetailPostDto extends BasicPostDto {
		@ApiProperty({ description: '状态', enum: PostInterface.STATUS })
		readonly status: PostInterface.status;
		@ApiProperty({ description: '作者' })
		readonly author?: string;
		@ApiProperty({ description: '内容，html字符串格式' })
		readonly content: string;
		@ApiProperty({ description: '描述' })
		readonly description: string;
		@ApiProperty({ description: '标签' })
		readonly tags: string[];
		@ApiProperty({ description: '留言' })
		readonly comments: CommentInterface.BasicComment[]; // 一篇文章下关联的留言，与留言为一对多关系
	}
	export class CreatePostDto extends PickType(DetailPostDto, ['content', 'description', 'tags', 'author', 'status', 'coverUrl', 'title']) { }
	export class UpdatePostDto extends CreatePostDto { }
}
