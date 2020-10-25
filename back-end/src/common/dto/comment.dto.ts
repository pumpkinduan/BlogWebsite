import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from './user.dto';
import { CommentInterface } from 'common/interfaces/index.interface'
import { IsDefined } from 'class-validator'
import { Column } from "typeorm";
export namespace CommentDto {
    // export class CreateCommentDto implements CommentInterface.CreateComment {
    export class CreateCommentDto {
        @IsDefined()
        @ApiProperty({ description: '留言的用户id' })
        readonly userId: string;
        @ApiProperty({ description: '留言内容' })
        readonly content: string;
        @IsDefined()
        @ApiProperty({ description: '留言的文章id' })
        readonly postId: string;
        @IsDefined()
        @ApiProperty({ description: '留言id' })
        readonly replyId: string;
    }
}
