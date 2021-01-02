import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Post } from 'entities'
@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
