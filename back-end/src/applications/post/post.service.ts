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
    ): Promise<Post[]> {
        // 分页
        const offset = page * pageSize - pageSize;
        const posts = await this.postRepository.find({
            skip: offset,
            take: pageSize,
            order: {
                createdAt: 'DESC',
            },
            select: [
                'id',
                'coverUrl',
                'createdAt',
                'author',
                'description',
                'category',
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
        // sql: select category, COUNT(category) as count from post GROUP BY category;
        return await this.postRepository
            .createQueryBuilder('post')
            .select('count(category) AS count')
            .addSelect('post.category', 'category')
            .groupBy('category')
            .execute();
    }

    // 获取文章的归档
    async getArchives(): Promise<PostInterface.Archive[]> {
        const archives: Record<'dates' | 'ids' | 'count' | 'titles', string>[] = await this.postRepository
            .createQueryBuilder('post')
            .select('DATE_FORMAT(createdAt, "%Y,%c") AS dates')
            .addSelect('COUNT(*) AS count')
            .addSelect('GROUP_CONCAT(post.id) AS ids')
            .addSelect('GROUP_CONCAT(post.title) AS titles')
            .orderBy('post.createdAt', 'DESC')
            .groupBy('dates')
            .execute();

        const dataSource = [];
        archives.map((archive) => {
            const dates = archive.dates.split(',');
            const ids = archive.ids.split(',')
            const titles = archive.titles.split(',');
            const list = { month: +dates[1], items: [], count: +archive.count }
            const result: any = { fullyear: +dates[0], list: list };
            for (let i = 0; i < list.count; i++) {
                list.items.push({ id: +ids[i], title: titles[i] })
            }
            return result;
        }).forEach((archive) => {
            const temp = dataSource.find((data) => data.fullyear === archive.fullyear);
            if (temp) {
                temp.lists.push(archive.list);
                return;
            }
            dataSource.push({
                fullyear: archive.fullyear,
                lists: [archive.list]
            })
        })
        return dataSource;
    }

    async create(createPost: PostInterface.CreatePost): Promise<Post> {
        const date = new Date();
        return await this.postRepository.save({
            ...createPost,
            fullyear: date.getFullYear(),
            month: date.getMonth() + 1,
        });
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
