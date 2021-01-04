import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Post, User } from 'entities'
@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, User])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
