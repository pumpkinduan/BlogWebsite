import {
	Body,
	Controller,
	Delete,
	Get,
	Query,
	Param,
	Post,
	Put,
	Inject,
	HttpStatus,
	UseGuards,
} from '@nestjs/common';
import { PostDto } from 'common/dto/index.dto';
import {
	ResultInterface,
	SuccessMessage,
} from 'common/interfaces/index.interface';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { formatDate } from 'utils/index.util';
import { Post as PostEntity } from 'entities';
import { AuthGuard } from '@nestjs/passport';
@Controller('posts')
@ApiTags('文章')
export class PostController {
	constructor(@Inject(PostService) private readonly postService: PostService) { }
	@ApiOperation({ description: '创建文章' })
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@Post('/create')
	async createPost(
		@Body()
		createPostDto: PostDto.CreatePostDto,
	): Promise<ResultInterface<PostEntity>> {
		const post = await this.postService.create(createPostDto);
		return {
			success: true,
			data: post,
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.CREATE,
		};
	}

	@ApiOperation({ description: '获取文章列表' })
	@Get()
	@ApiQuery({ name: 'page', })
	@ApiQuery({ name: 'pageSize' })
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
	@Get(':id/detail')
	async getPostDetail(
		@Param('id') id: string,
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
	@ApiOperation({ description: '获取指定文章的留言' })
	@Get(':id/comments')
	async getPostComments(
		@Param('id') id: string,
	): Promise<ResultInterface> {
		let post = await this.postService.findPostComments(id);
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

	@ApiOperation({ description: '删除文章' })
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
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
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
	@Put(':id')
	async updatePost(
		@Body() updatePostDto: PostDto.UpdatePostDto,
		@Param('id') id: string,
	): Promise<ResultInterface> {
		await this.postService.update(id, updatePostDto);
		return {
			success: true,
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.UPDATE,
		};
	}
}
