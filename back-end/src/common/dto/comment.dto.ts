import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from './user.dto';
import { CommentInterface } from 'common/interfaces/index.interface'
import { IsDefined } from 'class-validator'
export namespace CommentDto {
    export class CreateCommentDto implements CommentInterface.CreateComment {
        @IsDefined()
        @ApiProperty({ description: '留言的用户' })
        readonly related_user: UserDto.BasicUserDto; // 留言关联的用户，与用户为一对一关系
        @IsDefined()
        @ApiProperty({ description: '留言内容' })
        readonly content: string;
        @IsDefined()
        @ApiProperty({ description: '留言的文章' })
        readonly related_post_id: string;
    }
}
