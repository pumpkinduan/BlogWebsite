import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyDto } from 'common/dto/reply.dto';
import { Comment, Reply, User } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class ReplyService {
	constructor(
		@InjectRepository(Reply) readonly replyRepository: Repository<Reply>,
		@InjectRepository(User) readonly userRepository: Repository<User>,
		@InjectRepository(Comment) readonly commentRepository: Repository<Comment>,
	) { }

	async create(createReplyDto: ReplyDto.CreateReplyDto & { sourceUserId: number }): Promise<Reply> {
		const reply = this.replyRepository.create(createReplyDto);
		const parentComment = { id: createReplyDto.commentId }
		const sourceUser = await this.userRepository.findOne(
			createReplyDto.sourceUserId,
			{ select: ['id', 'username'] },
		);
		const targetUser = await this.userRepository.findOne(
			createReplyDto.targetUserId,
			{ select: ['id', 'username'] },
		);
		reply.comment = parentComment;
		reply.sourceUser = sourceUser;
		reply.targetUser = targetUser;
		return await this.replyRepository.save(reply);
	}

	async deleteOneById(id: number) {
		await this.replyRepository.delete(id);
	}

	async find(): Promise<Reply[]> {
		return await this.replyRepository.find({ relations: ['comment'] });
	}
}
