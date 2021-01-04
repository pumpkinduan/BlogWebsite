import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'common/dto/index.dto'
import { Comment, Post, User } from 'entities'
import { USER_TYPE } from 'common/interfaces/user.interface';
import { formatDate } from 'utils/index.util';
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) readonly commentRepository: Repository<Comment>,
        @InjectRepository(Post) readonly postRepository: Repository<Post>,
        @InjectRepository(User) readonly userRepository: Repository<User>,
    ) { }
    async create(createComment: CommentDto.CreateCommentDto): Promise<Comment> {
        // 建立了外键关系时，save时必须传入实体
        const comment = this.commentRepository.create(createComment);
        const sourceUser = await this.userRepository.findOne(createComment.sourceUserId, { select: ['email', 'id', 'profiles', 'username', 'type', 'webUrl'] });
        comment.sourceUser = sourceUser;
        comment.post = { id: createComment.postId };
        return await this.commentRepository.save(comment);
    }

    async deleteOneById(id: string): Promise<void> {
        await this.commentRepository.delete(id);
    }

    async findAndCount(page: number,
        pageSize: number): Promise<[Comment[], number]> {
        // 分页
        const offset = page * pageSize - pageSize;
        const comments = await this.commentRepository.findAndCount({
            skip: offset,
            take: pageSize,
            relations: ['sourceUser', 'replies', 'replies.comment']
        });
        comments[0].forEach(comment => {
            formatDate(comment, ['createdAt']);
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
        return comments;
    }
}