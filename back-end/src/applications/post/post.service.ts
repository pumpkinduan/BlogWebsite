import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, Comment } from 'entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostInterface, USER_TYPE } from 'common/interfaces/index.interface';
import { formatDate } from 'utils/index.util';
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) readonly postRepository: Repository<Post>,
        @InjectRepository(Comment) readonly commentRepository: Repository<Comment>,
    ) { }
    async findAndCount(
        page: number,
        pageSize: number,
    ): Promise<[Post[], number]> {
        // 分页
        const offset = page * pageSize - pageSize;
        const posts = await this.postRepository.findAndCount({
            skip: offset,
            take: pageSize,
            select: [
                'id',
                'coverUrl',
                'description',
                'title',
                'browsers',
                'likes',
                'totalComments'
            ],
        })
        const suspenses = await posts[0].map(async (post) => {
            post.totalComments = await this.findPostTotalComments(post.id);
            return post;
        })
        posts[0] = await Promise.all(suspenses);
        return posts;
    }

    // 查询指定post下的留言总数
    async findPostTotalComments(id: number) {
        return await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.postId = :id', { id })
            .getCount();
    }

    async create(createPost: PostInterface.CreatePost): Promise<Post> {
        return await this.postRepository.save(createPost);
    }
    async update(
        id: number,
        updatePost: PostInterface.UpdatePost,
    ): Promise<void> {
        const existing_post = await this.postRepository.findOne(id);
        if (!existing_post)
            throw new NotFoundException(`更新帖子失败，ID 为${id}的帖子不存在`);
        await this.postRepository.update(id, updatePost);
    }

    // 获取文章详情
    async findOneById(id: number): Promise<Post> {
        const post = await this.postRepository.findOne(id, {
            relations: ['comments'],
        });
        this.findPostTotalComments(id)
        // post.comments.forEach(comment => {
        //     // NOTE: 将UTC格式的时间进行转换
        //     formatDate(comment, ['createdAt', 'deletedAt', 'updatedAt']);
        //     Reflect.deleteProperty(comment.sourceUser, 'password');
        //     if (comment.sourceUser.type === USER_TYPE.NORMAL) {
        //         // 普通用户
        //         Reflect.deleteProperty(comment.sourceUser, 'profiles');
        //     }
        //     if (comment.sourceUser.type === USER_TYPE.ADMIN) {
        //         // 超级用户
        //         Reflect.deleteProperty(comment.sourceUser, 'webUrl');
        //     }
        // });
        return post;
    }
    async findPostComments(id: number) {
        return await this.postRepository
            .createQueryBuilder('post')
            .select(['post.id', 'post.status', 'post.title', ''])
            .where('post.id = :id', { id })
            .getOne();
        // return await this.postRepository.findOne(id);
    }
    async deleteOneById(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
