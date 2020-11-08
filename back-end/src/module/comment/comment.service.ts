import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'common/dto/index.dto'
import { Comment, Post } from 'entity'
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) readonly commentRepository: Repository<Comment>,
        @InjectRepository(Post) readonly PostRepository: Repository<Post>,
    ) { }
    async create(createComment: CommentDto.CreateCommentDto): Promise<Comment> {
        const children = createComment.replyId ? [createComment.replyId] : [];
        const post = await this.PostRepository.findOne(createComment.postId);
        return await this.commentRepository.save(Object.assign(createComment, { children, post }));
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
