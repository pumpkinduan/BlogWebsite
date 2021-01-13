import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty } from 'class-validator'
export namespace CommentDto {
    export class CreateCommentDto {
        // @IsDefined()
        // @ApiProperty({ description: '留言的用户id' })
        // readonly sourceUserId: number;

        @IsNotEmpty()
        @ApiProperty({ description: '留言内容' })
        readonly content: string;

        @IsDefined()
        @ApiProperty({ description: '留言所属的主题id' })
        readonly postId: number;
    }
}
