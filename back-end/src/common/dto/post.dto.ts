import { PostInterface } from 'common/interfaces/index.interface'
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional } from 'class-validator'
export namespace PostDto {
	export class CreatePostDto implements PostInterface.CreatePost {
		@ApiProperty({ description: '封面地址' })
		@IsDefined()
		readonly coverUrl: string;

		@ApiProperty({ description: '标题' })
		@IsDefined()
		readonly title: string;

		@ApiProperty({ description: '状态', enum: PostInterface.STATUS })
		@IsDefined()
		readonly status: PostInterface.status;

		@IsOptional()
		@ApiProperty({ description: '作者' })
		readonly author?: string;

		@ApiProperty({ description: '内容，html字符串格式' })
		@IsDefined()
		readonly content: string;

		@ApiProperty({ description: '描述' })
		@IsDefined()
		readonly description: string;

		@ApiProperty({ description: '标签' })
		@IsDefined()
		readonly tags: string[];
	}
	export class UpdatePostDto extends CreatePostDto { }
}
