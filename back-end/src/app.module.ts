import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from 'module/post/post.module';
import { CommentModule } from 'module/comment/comment.module';
import { UserModule } from 'module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, User, Post } from 'entity/index'
@Module({
  imports: [TypeOrmModule.forRootAsync(({
    useFactory: () => ({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "pumpkin108",
      database: "my_website",
      entities: [Comment, Post, User],
      synchronize: true
    })
  })), PostModule, CommentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
