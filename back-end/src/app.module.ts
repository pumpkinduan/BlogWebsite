import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, CommentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
