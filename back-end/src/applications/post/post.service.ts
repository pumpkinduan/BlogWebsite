import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostInterface, USER_TYPE } from 'common/interfaces/index.interface';
import { formatDate } from 'utils/index.util';
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
                'coverUrl',
                'description',
                'title',
                'browsers',
                'likes',
                'comments'
            ],
        });
    }

    async create(createPost: PostInterface.CreatePost): Promise<Post> {
        return await this.postRepository.save(createPost);
    }
    async update(
        id: string,
        updatePost: PostInterface.UpdatePost,
    ): Promise<void> {
        const existing_post = await this.postRepository.findOne(id);
        if (!existing_post) throw new NotFoundException(`更新帖子失败，ID 为${id}的帖子不存在`);
        await this.postRepository.update(id, updatePost);
    }
    async findOneById(id: string): Promise<Post> {
        const post = await this.postRepository.findOne(id, {
            relations: ['comments', 'comments.sourceUser', 'comments.replies'],
        });
        post.comments.forEach(comment => {
            // NOTE: 将UTC格式的时间进行转换
            formatDate(comment, ['createdAt', 'deletedAt', 'updatedAt']);
            Reflect.deleteProperty(comment.sourceUser, 'password');
            if (comment.sourceUser.type === USER_TYPE.NORMAL) {
                // 普通用户
                Reflect.deleteProperty(comment.sourceUser, 'profiles');
            }
            if (comment.sourceUser.type === USER_TYPE.ADMIN) {
                // 超级用户
                Reflect.deleteProperty(comment.sourceUser, 'webUrl');
            }
        });
        return post;
    }
    async findPostComments(id: string) {
        return await this.postRepository.findOne(id);
    }
    async deleteOneById(id: string): Promise<void> {
        await this.postRepository.delete(id);
    }
}
