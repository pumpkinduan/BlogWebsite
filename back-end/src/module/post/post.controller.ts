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
import { formatDate } from 'util/index';
import { Post as PostEntity } from 'entity/post.entity';
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
		let post = await this.postService.create(createPostDto);
		// NOTE: 将UTC格式的时间进行转换
		post = formatDate<PostEntity>(post, [
			'createdAt',
			'deletedAt',
			'updatedAt',
		]) as PostEntity;
		return {
			success: true,
			data: [post],
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.CREATE,
		};
	}

	@ApiOperation({ description: '获取文章列表' })
	@Get()
	async getPosts(
		@Query('page') page = 1,
		@Query('pageSize') pageSize = 10,
	): Promise<ResultInterface> {
		const posts = await this.postService.findAndCount(page, pageSize);
		posts[0] = formatDate<PostEntity>(posts[0], [
			'createdAt',
			'deletedAt',
			'updatedAt',
		]) as PostEntity[];
		return {
			statusCode: HttpStatus.OK,
			data: posts,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章详情' })
	@Get(':id')
	async getPostDetail(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<ResultInterface> {
		let post = await this.postService.findOneById(id);
		post = formatDate<PostEntity>(post, [
			'createdAt',
			'deletedAt',
			'updatedAt',
		]) as PostEntity;
		return {
			statusCode: HttpStatus.OK,
			data: post,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章下的留言列表' })
	@Get(':id/comments')
	getPostComments(@Param('id') id: string): CommentInterface.BasicComment[] {
		return [exampleInstance.commentListItem];
	}

	@ApiOperation({ description: '删除文章' })
	@Delete(':id')
	async deletePost(@Param('id') id: string): Promise<ResultInterface> {
		await this.postService.deleteOneById(id);
		return {
			success: true,
			message: SuccessMessage.Post.DELETE,
			statusCode: HttpStatus.OK,
		};
	}

	@ApiOperation({ description: '更新文章' })
	@Put(':id')
	async updatePost(
		@Body(new ValidationPipe()) updatePostDto: PostDto.UpdatePostDto,
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<ResultInterface> {
		let post = await this.postService.update(id, updatePostDto);
		post = formatDate<PostEntity>(post, [
			'createdAt',
			'deletedAt',
			'updatedAt',
		]) as PostEntity;
		return {
			success: true,
			data: post,
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.UPDATE
		};
	}
}
