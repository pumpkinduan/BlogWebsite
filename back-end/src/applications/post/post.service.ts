import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, Comment } from 'entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostInterface } from 'common/interfaces/index.interface';
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
            order: {
                createdAt: 'DESC',
            },
            select: [
                'id',
                'coverUrl',
                'description',
                'title',
                'browsers',
                'likes',
                'totalComments',
            ],
        });
        return posts;
    }

    // 获取文章详情
    async findOneById(id: number): Promise<Post> {
        const post = await this.postRepository.findOne(id);
        const postComments = await this.findPostComments(id);
        post.comments = postComments;
        return post;
    }

    // 查询指定post下的留言总数
    async findPostTotalComments(id: number) {
        return await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.postId = :id', { id })
            .getCount();
    }

    // 获取指定文章下的留言
    async findPostComments(
        postId: number,
        page = 1,
        pageSize = 10,
    ): Promise<Comment[]> {
        const offset = page * pageSize - pageSize;
        return await this.commentRepository
            .createQueryBuilder('comment')
            .select([
                'comment.id',
                'comment.content',
                'comment.createdAt',
                'reply.id',
                'reply.content',
                'reply.createdAt',
                'sourceUser.id',
                'sourceUser.username',
                'reply_sourceUser.id',
                'reply_sourceUser.username',
                'reply_targetUser.id',
                'reply_targetUser.username',
            ])
            .leftJoin('comment.sourceUser', 'sourceUser')
            .leftJoin('comment.replies', 'reply')
            .leftJoin('reply.sourceUser', 'reply_sourceUser')
            .leftJoin('reply.targetUser', 'reply_targetUser')
            .where('comment.postId = :id', { id: postId })
            .take(pageSize)
            .skip(offset)
            .getMany();
    }

    // 获取文章的分类标签
    async getCategories(): Promise<PostInterface.Category[]> {
        return await this.postRepository
            .createQueryBuilder('post')
            .select('count("id")', 'counts')
            .addSelect('post.category', 'category')
            .groupBy('post.category')
            .execute();
    }

    // 获取文章的归档
    async getArchives() {
        // await this.postRepository.findAndCount;
    }

    async create(createPost: PostInterface.CreatePost): Promise<Post> {
        return await this.postRepository.save(createPost);
    }

    /**
     * 更新文章的点赞数
     * @param payload 增量
     */
    async updatePostTotalLikes(postId: number, payload: { count: number }) {
        await this.postRepository.update(postId, {
            likes: () => `likes + ${payload.count}`,
        });
    }

    /**
     * 更新文章的浏览量
     * @param payload 增量
     */
    async updatePostTotalBrowsers(postId: number, payload: { count: number }) {
        await this.postRepository.update(postId, {
            browsers: () => `browsers + ${payload.count}`,
        });
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

    async deleteOneById(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
