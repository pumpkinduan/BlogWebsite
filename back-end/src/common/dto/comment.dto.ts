import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from 'class-validator'
export namespace CommentDto {
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
        @ApiProperty({ description: '回复id' })
        readonly replyId?: string;
    }
}
