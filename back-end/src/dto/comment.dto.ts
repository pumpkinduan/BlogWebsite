import { ApiProperty, PickType } from "@nestjs/swagger";
import { userDto } from './user.dto';
export namespace CommentDto {
    export class basicCommentDto {
        @ApiProperty({ description: '留言id' })
        id: string;
        @ApiProperty({ description: '留言内容' })
        content: string;
        created_at: string;
        @ApiProperty({ description: '留言的用户' })
        related_user: userDto.basicUserDto; // 留言关联的用户，与用户为一对一关系
        @ApiProperty({ description: '子留言 => 回复' })
        children: basicCommentDto[] // 回复
        @ApiProperty({ description: '留言的文章' })
        related_post_id: string;
    }
    export class createCommentDto extends PickType(basicCommentDto, ['content', 'related_user', 'related_post_id']) { }
}
