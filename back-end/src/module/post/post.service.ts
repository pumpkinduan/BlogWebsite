import { Injectable } from '@nestjs/common';
import { Post } from 'entity/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostInterface } from 'common/interfaces/index.interface';
@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post) readonly postRepository: Repository<Post>,
	) { }
	async findAndCount(
		page: number,
		pageSize: number,
	): Promise<[Post[], number]> {
		// 分页
		const offset = page * pageSize - pageSize;
		return await this.postRepository.findAndCount({
			skip: offset,
			take: pageSize,
			select: [
				'id',
				'createdAt',
				'title',
				'visitors',
				'downloads',
				'coverUrl',
				'likes',
			],
		});
	}

	async create(createPost: PostInterface.CreatePost): Promise<Post> {
		return await this.postRepository.save(createPost);
	}
	async update(id: string, updatePost: PostInterface.UpdatePost): Promise<Post> {
		// const post = await this.postRepository.findOne(id);
		// Reflect.ownKeys(updatePost).forEach((prop) => {
		// 	if (post[prop] !== updatePost[prop]) {
		// 		post[prop] = updatePost[prop];
		// 	}
		// })
		// return await this.postRepository.save(post);
		await this.postRepository.update(id, updatePost);
		return await this.postRepository.findOne(id);
	}
	async findOneById(id: string): Promise<Post> {
		return await this.postRepository.findOne(id);
	}

	async deleteOneById(id: string): Promise<void> {
		await this.postRepository.delete(id);
	}
}
