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

	async create(createReplyDto: ReplyDto.CreateReplyDto): Promise<Reply> {
		console.log(createReplyDto);

		const reply = this.replyRepository.create(createReplyDto);
		// const parentComment = await this.commentRepository.findOne(
		// 	createReplyDto.commentId,
		// );
		const parentComment = { id: createReplyDto.commentId }
		const sourceUser = await this.userRepository.findOne(
			createReplyDto.sourceUserId,
			{ select: ['email', 'id', 'username', 'type', 'webUrl'] },
		);
		const targetUser = await this.userRepository.findOne(
			createReplyDto.targetUserId,
			{ select: ['email', 'id', 'username', 'type', 'webUrl'] },
		);
		reply.comment = parentComment;
		reply.sourceUser = sourceUser;
		reply.targetUser = targetUser;
		console.log(reply);

		return await this.replyRepository.save(reply);
	}

	async deleteOneById(id: number) {
		await this.replyRepository.delete(id);
	}

	async find(): Promise<Reply[]> {
		return await this.replyRepository.find({ relations: ['comment'] });
	}
}
