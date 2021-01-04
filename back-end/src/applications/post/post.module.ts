import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Post } from 'entities'
@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {

}
