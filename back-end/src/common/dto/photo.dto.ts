import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export enum PHOTO_TYPE {
    POST = 'POST',      // 文章的图片
    WALL = 'WALL',    // 相册墙
    AVATAR = 'AVATAR' //头像
}
export class CreatePhotoDto {
    @ApiProperty({ description: '图片类型', enum: PHOTO_TYPE, example: PHOTO_TYPE.POST })
    @IsEnum(PHOTO_TYPE)
    type: PHOTO_TYPE;

    @ApiProperty({ description: '用户id， 上传的是头像，则需要用户id' })
    @IsOptional()
    userId: number;
}

export class DeletePhotoDto {
    @IsNotEmpty()
    @ApiProperty({ description: '图片id' })
    id: number
}