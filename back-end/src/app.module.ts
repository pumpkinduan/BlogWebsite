import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from 'module/post/post.module';
import { CommentModule } from 'module/comment/comment.module';
import { UserModule } from 'module/user/user.module';

@Module({
  imports: [PostModule, CommentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
