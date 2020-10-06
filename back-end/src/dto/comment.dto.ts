import { userDto } from './user.dto';
export namespace commentDto {
    export interface basicCommentDto {
        id: number;
        content: string;
        created_at: string;
        related_user: userDto.basicUserDto; // 留言关联的用户，与用户为一对一关系
        children: basicCommentDto[] // 回复
    }
    export interface createCommentDto {
        content: string;
        related_user_id: number;
    }
}
