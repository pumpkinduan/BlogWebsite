import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";

export enum PHOTO_TYPE {
    POST, // 文章的图片
    WALL // 相册墙
}
export class CreatePhotoDto {
    @ApiProperty({ description: '图片类型', enum: PHOTO_TYPE, default: PHOTO_TYPE.WALL })
    @IsEnum(PHOTO_TYPE)
    type: PHOTO_TYPE;

    @ApiProperty({ description: '图片大小' })
    @IsNotEmpty()
    size: number;

    @ApiProperty({ description: '图片绝对路径地址', example: 'https://www.baidu.com/imgs/logo.jpg' })
    @IsNotEmpty()
    url: string;

    @ApiProperty({ description: '图片路径地址', example: 'imgs/logo.jpg' })
    @IsNotEmpty()
    path: string;

    @ApiProperty({ description: '图片名', example: 'logo.jpg' })
    @IsNotEmpty()
    filename: string;

    @ApiProperty({ description: '媒体类型', example: 'image/jpeg' })
    @IsNotEmpty()
    mimetype: string;
}

export class DeletePhotoDto {
    @ApiProperty({ description: '图片id' })
    id: number
}