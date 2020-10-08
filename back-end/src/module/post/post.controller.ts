import { Body, Controller, Delete, Get, Param, Post, Query, Put, Inject } from '@nestjs/common';
import { PostDto } from 'common/dto/index.dto';
import { PostInterface, CommentInterface, ResultInterface } from 'common/interfaces/index.interface'
import { exampleInstance } from 'common/example';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
@Controller('posts')
@ApiTags('文章')
export class PostController {
	constructor(@Inject(PostService) private readonly postService: PostService) { }
	@ApiOperation({ description: '创建文章' })
	@Post('/create')
	createPost(@Body() createPostDto: PostDto.CreatePostDto) {
		const createPost = Object.assign(createPostDto, { id: Date.now() + '', tags: createPostDto.tags.join() })
		this.postService.create(createPost)
		return {
			success: true,
			data: createPost
		};
	}

	@ApiOperation({ description: '获取文章列表' })
	@Get()
	async getPosts(@Query('page') page: number): Promise<ResultInterface> {
		const posts = await this.postService.findAll()
		return { statusCode: 200, data: posts, message: '成功返回' };
	}

	@ApiOperation({ description: '获取文章详情' })
	@Get(':id')
	getPostDetail(@Param('id') id: string): PostInterface.DetailPost {
		return exampleInstance.postDetail;
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
