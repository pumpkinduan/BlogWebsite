import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'common/dto/index.dto';
import { Comment, Post, User, Reply } from 'entities';
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) readonly commentRepository: Repository<Comment>,
        @InjectRepository(Post) readonly postRepository: Repository<Post>,
        @InjectRepository(User) readonly userRepository: Repository<User>,
        @InjectRepository(Reply) readonly replyRepository: Repository<Reply>,
    ) { }

    async create(createComment: CommentDto.CreateCommentDto & { sourceUserId: number }): Promise<Comment> {
        // 建立了外键关系时，save时必须传入实体
        const comment = this.commentRepository.create(createComment);
        const sourceUser = await this.userRepository.findOne(
            createComment.sourceUserId,
            { select: ['id', 'username'] },
        );
        comment.sourceUser = sourceUser;
        comment.post = { id: createComment.postId };
        const result = await this.commentRepository.save(comment);
        // 留言总数 +1
        await this.postRepository.update(createComment.postId, { totalComments: () => `totalComments + ${1}` })
        return result;
    }

    async deleteOneById(id: number): Promise<void> {
        await this.commentRepository.delete(id);
    }

    // 获取指定留言下的回复列表
    async findCommentRepliesById(commentId: number, pageSize = 10) {
        return await this.replyRepository
            .createQueryBuilder('reply')
            .select([
                'reply.id',
                'reply.content',
                'reply.createdAt',
                'sourceUser.id',
                'sourceUser.username',
                'targetUser.id',
                'targetUser.username',
            ])
            .leftJoin('reply.sourceUser', 'sourceUser')
            .leftJoin('reply.targetUser', 'targetUser')
            .where('reply.commentId = :id', { id: commentId })
            .take(pageSize)
            .getManyAndCount()
    }

    // 按照分页获取留言列表
    async findAndCount(
        page: number,
        pageSize: number,
    ): Promise<[Comment[], number]> {
        // 分页
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
                'reply_targetUser.username'
            ])
            .leftJoin('comment.sourceUser', 'sourceUser')
            .leftJoin('comment.replies', 'reply')
            .leftJoin('reply.sourceUser', 'reply_sourceUser')
            .leftJoin('reply.targetUser', 'reply_targetUser')
            .take(pageSize)
            .skip(offset)
            .getManyAndCount()
    }
}
