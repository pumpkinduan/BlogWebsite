import { Body, Controller, Delete, Get, Param, Post, Query, Put } from '@nestjs/common';
import { PostDto, CommentDto } from 'dto/index.dto';
import { exampleInstance } from 'example';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('posts')
@ApiTags('文章')
export class PostController {

	@ApiOperation({ description: '创建文章' })
	@Post('/create')
	createPost(@Body() createPostDto: PostDto.createPostDto) {
		return {
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章列表' })
	@Get()
	getPosts(@Query('page') page: number): PostDto.basicPostDto[] {
		return [exampleInstance.postListItem];
	}

	@ApiOperation({ description: '获取文章详情' })
	@Get(':id')
	getPostDetail(@Param('id') id: string): PostDto.detailPostDto {
		return exampleInstance.postDetail;
	}

	@ApiOperation({ description: '获取文章下的留言列表' })
	@Get(':id/comments')
	getPostComments(@Param('id') id: string): CommentDto.basicCommentDto[] {
		return [exampleInstance.commentListItem];
	}


	@ApiOperation({ description: '删除文章' })
	@Delete(':id')
	deletePost(@Param('id') id: string) {
		return {
			success: true,
		}
	}

	@ApiOperation({ description: '更新文章' })
	@Put(':id')
	updatePost(@Body() updatePostDto: PostDto.updatePostDto, @Param() id: string) {
		return {
			success: true,
		}
	}

}
