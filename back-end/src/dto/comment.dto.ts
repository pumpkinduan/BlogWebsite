import { ApiProperty } from "@nestjs/swagger";
import { userDto } from './user.dto';
export namespace commentDto {
    export class basicCommentDto {
        id: number;
        content: string;
        created_at: string;
        related_user: userDto.basicUserDto; // 留言关联的用户，与用户为一对一关系
        children: basicCommentDto[] // 回复
    }
    export class createCommentDto {
        @ApiProperty({ description: '留言内容' })
        content: string;
        @ApiProperty({ description: '留言的用户' })
        related_user: userDto.basicUserDto;
    }
}
