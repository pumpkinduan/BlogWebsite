import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional } from 'class-validator'
export namespace ReplyDto {
    export class CreateReplyDto {
        @ApiProperty({ description: '留言内容' })
        readonly content: string;

        @IsDefined()
        @ApiProperty({ description: '留言的文章id' })
        readonly postId: string;

        @IsDefined()
        @ApiProperty()
        readonly sourceUserId: string;

        @IsOptional()
        @ApiProperty({ description: '父级留言id', nullable: true, required: false })
        readonly commentId: string;

        @IsOptional()
        @ApiProperty({ nullable: true, required: false })
        readonly targetUserId: string;
    }
}
