import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from 'applications/post/post.module';
import { CommentModule } from 'applications/comment/comment.module';
import { UserModule } from 'applications/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, User, Post, Reply, Photo } from 'entities';
import { LoggerMiddleware } from 'middlewares/logger.middleware';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './applications/auth/auth.module';
import { ReplyModule } from './applications/reply/reply.module';
import { PhotoModule } from './applications/photo/photo.module';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'pumpkin108',
                database: 'my_website',
                entities: [Comment, Post, User, Reply, Photo],
                synchronize: true,
                logger: 'advanced-console',
                charset: 'utf8mb4_general_ci' // 支持emoji
                // logging: 'all'
            }),
        }),
        PostModule,
        CommentModule,
        UserModule,
        AuthModule,
        PassportModule,
        ReplyModule,
        PhotoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
