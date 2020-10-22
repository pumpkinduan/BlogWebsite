import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'entity/post.entity'
import { LoggerMiddleware } from 'middleware'
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('posts')
  }
}
