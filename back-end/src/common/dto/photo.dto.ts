import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export enum PHOTO_TYPE {
    POST, // 文章的图片
    WALL // 相册墙
}
export class CreatePhotoDto {
    @ApiProperty({ description: '图片类型', enum: PHOTO_TYPE })
    @IsEnum(PHOTO_TYPE)
    type: PHOTO_TYPE;
}

export class DeletePhotoDto {
    @ApiProperty({ description: '图片id' })
    id: number
}