import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { Comment, Reply, User } from 'entities'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Reply, User, Comment])],
  controllers: [ReplyController],
  providers: [ReplyService]
})
export class ReplyModule { }
