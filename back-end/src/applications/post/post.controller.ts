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
	ParseIntPipe,
} from '@nestjs/common';
import { PostDto } from 'common/dto/index.dto';
import {
	ResultInterface,
	SuccessMessage,
} from 'common/interfaces/index.interface';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { Post as PostEntity } from 'entities';
import { JwtAuthGuard } from 'src/guards/index.guard'
@Controller('posts')
@ApiTags('文章')
export class PostController {
	constructor(@Inject(PostService) private readonly postService: PostService) { }
	@ApiOperation({ description: '创建文章' })
	@UseGuards(new JwtAuthGuard())
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
	@ApiQuery({ name: 'page', example: 1 })
	@ApiQuery({ name: 'pageSize', example: 10 })
	async getPosts(
		@Query('page') page = 1,
		@Query('pageSize') pageSize = 10,
	): Promise<ResultInterface> {
		const posts = await this.postService.findAndCount(page, pageSize);
		return {
			statusCode: HttpStatus.OK,
			data: posts[0],
			message: SuccessMessage.Post.OK,
			success: true,
			sum: posts[1]
		};
	}

	@ApiOperation({ description: '获取文章详情' })
	@Get(':id/detail')
	async getPostDetail(
		@Param('id', new ParseIntPipe()) id: number,
	): Promise<ResultInterface> {
		const post = await this.postService.findOneById(id);
		return {
			statusCode: HttpStatus.OK,
			data: post,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章分类' })
	@Get('/categories')
	async getCategories(): Promise<ResultInterface> {
		const categories = await this.postService.getCategories();
		return {
			statusCode: HttpStatus.OK,
			data: categories,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取文章归档' })
	@Get('/archives')
	async getArchives(): Promise<ResultInterface> {
		const archives = await this.postService.getArchives();
		return {
			statusCode: HttpStatus.OK,
			data: archives,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '获取指定文章下的留言' })
	@ApiQuery({ name: 'page', example: 1 })
	@ApiQuery({ name: 'pageSize', example: 10 })
	@Get(':id/comments')
	async getPostComments(
		@Param('id', new ParseIntPipe()) id: number,
		@Query('page') page = 1,
		@Query('pageSize') pageSize = 10,
	): Promise<ResultInterface> {
		const postComments = await this.postService.findPostComments(
			id,
			page,
			pageSize,
		);
		return {
			statusCode: HttpStatus.OK,
			data: postComments,
			message: SuccessMessage.Post.OK,
			success: true,
		};
	}

	@ApiOperation({ description: '删除文章' })
	@ApiBearerAuth()
	@UseGuards(new JwtAuthGuard())
	@Delete(':id')
	async deletePost(
		@Param('id', new ParseIntPipe()) id: number,
	): Promise<ResultInterface> {
		await this.postService.deleteOneById(id);
		return {
			success: true,
			message: SuccessMessage.Post.DELETE,
			statusCode: HttpStatus.OK,
		};
	}

	@ApiOperation({ description: '更新文章的点赞数' })
	@Post(':id/liked')
	async updatePostTotalLikes(
		@Body() body: PostDto.UpdateCountDto,
		@Param('id', new ParseIntPipe()) id: number,
	): Promise<ResultInterface> {
		await this.postService.updatePostTotalLikes(id, body);
		return {
			success: true,
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.LIKE,
		};
	}

	@ApiOperation({ description: '更新文章的浏览量' })
	@Post(':id/browsered')
	async updatePostTotalBrowsers(
		@Body() body: PostDto.UpdateCountDto,
		@Param('id', new ParseIntPipe()) id: number,
	): Promise<ResultInterface> {
		await this.postService.updatePostTotalBrowsers(id, body);
		return {
			success: true,
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.LIKE,
		};
	}

	@ApiOperation({ description: '更新文章信息' })
	@UseGuards(new JwtAuthGuard())
	@ApiBearerAuth()
	@Put(':id')
	async updatePost(
		@Body() updatePostDto: PostDto.UpdatePostDto,
		@Param('id', new ParseIntPipe()) id: number,
	): Promise<ResultInterface> {
		await this.postService.update(id, updatePostDto);
		return {
			success: true,
			statusCode: HttpStatus.OK,
			message: SuccessMessage.Post.UPDATE,
		};
	}
}
