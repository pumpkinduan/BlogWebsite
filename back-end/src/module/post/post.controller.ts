import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Put,
	Inject,
	HttpStatus,
	ParseIntPipe,
	ParseUUIDPipe,
	ValidationPipe,
} from '@nestjs/common';
import { PostDto } from 'common/dto/index.dto';
import {
	CommentInterface,
	ResultInterface,
	SuccessMessage,
} from 'common/interfaces/index.interface';
import { exampleInstance } from 'common/example';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
@Controller('posts')
@ApiTags('文章')
export class PostController {
	constructor(@Inject(PostService) private readonly postService: PostService) { }
	@ApiOperation({ description: '创建文章' })
	@Post('/create')
	async createPost(
		@Body(new ValidationPipe({ transform: true }))
		createPostDto: PostDto.CreatePostDto,
	): Promise<ResultInterface> {
		await this.postService.create(createPostDto);
		return {
			success: true,
			data: [],
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.CREATE,
		};
	}

	@ApiOperation({ description: '获取文章列表' })
	@Get()
	async getPosts(
		@Query(new ParseIntPipe()) page = 1,
		@Query(new ParseIntPipe()) pageSize = 10,
	): Promise<ResultInterface> {
		const posts = await this.postService.findAndCount(page, pageSize);
		return {
			statusCode: HttpStatus.OK,
			data: posts,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章详情' })
	@Get(':id')
	async getPostDetail(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResultInterface> {
		const posts = await this.postService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			data: posts,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章下的留言列表' })
	@Get(':id/comments')
	getPostComments(@Param('id', new ParseUUIDPipe()) id: string): CommentInterface.BasicComment[] {
		return [exampleInstance.commentListItem];
	}

	@ApiOperation({ description: '删除文章' })
	@Delete(':id')
	deletePost(@Param('id', new ParseUUIDPipe()) id: string) {
		return {
			success: true,
		};
	}

	@ApiOperation({ description: '更新文章' })
	@Put(':id')
	updatePost(
		@Body(new ValidationPipe()) updatePostDto: PostDto.UpdatePostDto,
		@Param('id', new ParseUUIDPipe()) id: string,
	) {
		const updatePost = Object.assign(updatePostDto, {
			tags: updatePostDto.tags.join(),
		});
		return {
			success: true,
		};
	}
}
