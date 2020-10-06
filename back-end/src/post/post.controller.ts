import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostDto } from 'dto/index.dto';
import { exampleInstance } from 'example';
@Controller('posts')
export class PostController {
	@Post()
	createPost(@Body() body: PostDto.createPostDto) {
		console.log('body', body);
		return {
			success: true,
		};
	}
	@Get()
	getPosts(@Query('page') page: number): PostDto.basicPostDto[] {
		return [exampleInstance.postListItem];
	}

	@Get(':id')
	getPostDetail(@Param('id') id: number): PostDto.detailPostDto {
		return exampleInstance.postDetail;
	}
}
