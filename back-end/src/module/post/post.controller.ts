import { Body, Controller, Delete, Get, Param, Post, Query, Put, Inject, HttpStatus } from '@nestjs/common';
import { PostDto } from 'common/dto/index.dto';
import { PostInterface, CommentInterface, ResultInterface } from 'common/interfaces/index.interface'
import { exampleInstance } from 'common/example';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
const cuid = require('cuid')
@Controller('posts')
@ApiTags('文章')
export class PostController {
	constructor(@Inject(PostService) private readonly postService: PostService) { }
	@ApiOperation({ description: '创建文章' })
	@Post('/create')
	async createPost(@Body() createPostDto: PostDto.CreatePostDto): Promise<ResultInterface> {
		const createPost = Object.assign(createPostDto, { id: cuid(), tags: createPostDto.tags.join() })
		await this.postService.create(createPost);
		return {
			success: true,
			data: createPost,
			statusCode: HttpStatus.OK
		};
	}

	@ApiOperation({ description: '获取文章列表' })
	@Get()
	async getPosts(@Query('page') page: number): Promise<ResultInterface> {
		const posts = await this.postService.findAll()
		return { statusCode: HttpStatus.OK, data: posts, message: '成功返回', success: true };
	}

	@ApiOperation({ description: '获取文章详情' })
	@Get(':id')
	async getPostDetail(@Param('id') id: string): Promise<ResultInterface> {
		const posts = await this.postService.findOne(id);
		return { statusCode: HttpStatus.OK, data: posts, message: '成功返回', success: true };
	}

	@ApiOperation({ description: '获取文章下的留言列表' })
	@Get(':id/comments')
	getPostComments(@Param('id') id: string): CommentInterface.BasicComment[] {
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
	updatePost(@Body() updatePostDto: PostDto.UpdatePostDto, @Param() id: string) {
		return {
			success: true,
		}
	}

}
