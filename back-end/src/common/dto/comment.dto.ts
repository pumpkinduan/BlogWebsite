import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from 'class-validator'
export enum COMMENT_TYPE {
    ALL = 'ALL',
    POST = 'POST',
    ADMIN = 'ADMIN'
}
export namespace CommentDto {
    export class CreateCommentDto {
        @IsNotEmpty()
        @ApiProperty({ description: '留言内容' })
        readonly content: string;

        @IsNotEmpty()
        @ApiProperty({ description: '留言所属的类别', enum: COMMENT_TYPE, example: COMMENT_TYPE.POST })
        readonly type: COMMENT_TYPE;

        @IsOptional()
        @ApiProperty({ description: '留言所属的主题id', nullable: true })
        readonly postId: number;
    }
}
