import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional } from 'class-validator'
export namespace ReplyDto {
    export class CreateReplyDto {
        @IsDefined()
        @ApiProperty({ description: '回复内容' })
        readonly content: string;

        @IsDefined()
        @ApiProperty({ description: '评论人id' })
        readonly sourceUserId: number;

        @IsOptional()
        @ApiProperty({ description: '父级留言id', nullable: true, required: false })
        readonly commentId: number;

        @IsOptional()
        @ApiProperty({ nullable: true, required: false, description: '评论的目标对象id' })
        readonly targetUserId: number;
    }
}
