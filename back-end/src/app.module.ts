import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from 'module/post/post.module';
import { CommentModule } from 'module/comment/comment.module';
import { UserModule } from 'module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, User, Post } from 'entity/index'
import { LoggerMiddleware } from 'middleware';
import { PassportModule } from '@nestjs/passport'
import { AuthModule } from './module/auth/auth.module';
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
  })), PostModule, CommentModule, UserModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
