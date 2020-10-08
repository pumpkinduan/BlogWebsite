import { ApiProperty, PickType } from "@nestjs/swagger";
import { UserDto } from './user.dto';
import { CommentInterface } from 'common/interfaces/index.interface'
export namespace CommentDto {
    export class BasicCommentDto implements CommentInterface.BasicComment {
        constructor(obj: CommentInterface.BasicComment) {
            Object.keys(obj).forEach((key) => { this[key] = obj[key] })
        }
        private static create(obj: CommentInterface.BasicComment): BasicCommentDto {
            return new BasicCommentDto(obj);
        }
        @ApiProperty({ description: '留言id' })
        readonly id: string;
        @ApiProperty({ description: '留言内容' })
        readonly content: string;
        created_at: string;
        @ApiProperty({ description: '留言的用户' })
        readonly related_user: UserDto.BasicUserDto; // 留言关联的用户，与用户为一对一关系
        @ApiProperty({ description: '子留言 => 回复' })
        readonly children: BasicCommentDto[] // 回复
        @ApiProperty({ description: '留言的文章' })
        readonly related_post_id: string;
    }
    export class CreateCommentDto extends PickType(BasicCommentDto, ['content', 'related_user', 'related_post_id']) { }
}
