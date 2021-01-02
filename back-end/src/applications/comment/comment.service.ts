import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'common/dto/index.dto'
import { Comment, Post } from 'entities'
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) readonly commentRepository: Repository<Comment>,
        @InjectRepository(Post) readonly PostRepository: Repository<Post>,
    ) { }
    async create(createComment: CommentDto.CreateCommentDto): Promise<Comment> {
        const children = createComment.replyId ? [createComment.replyId] : [];
        // 建立了外键关系时，save时必须传入实体
        return await this.commentRepository.save(Object.assign(createComment, { children, post: { id: createComment.postId }, user: { id: createComment.userId } }));
    }

    async deleteOneById(id: string): Promise<void> {
        await this.commentRepository.delete(id);
    }

    async findAndCount(page: number,
        pageSize: number): Promise<[Comment[], number]> {
        // 分页
        const offset = page * pageSize - pageSize;
        return await this.commentRepository.findAndCount({
            skip: offset,
            take: pageSize,
            relations: ['post', 'user']
        });
    }
}
