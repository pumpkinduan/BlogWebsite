import {
    Body,
    Controller,
    Delete,
    Inject,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseIntPipe,
    Param,
    Get,
    Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import {
    ResultInterface,
    SuccessMessage,
} from 'common/interfaces/index.interface';
import { Photo } from 'entities';
import { PhotoService } from './photo.service';
import * as fs from 'fs';
import { PhotoDto } from 'common/dto/index.dto';
import { FILE_LIMIT } from 'src/consts';

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 由于multer只会在初始化时创建目录(destination为字符串)，所以需要自己
        // 根据创建时间动态生成 文件目录
        const date = new Date();
        const dir = `${process.cwd()}/statics/uploads/${date.getFullYear()}-${date.getMonth() +
            1}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        //指定文件名
        cb(null, `${Date.now() + ''.slice(-6)}_${file.originalname}`);
    },
});
@Controller('photo')
@ApiTags('图片')
export class PhotoController {
    constructor(@Inject(PhotoService) readonly photoService: PhotoService) { }

    @Post('upload')
    @ApiOperation({ description: '表单字段名为：file' })
    @UseInterceptors(FileInterceptor('file', {
        storage, limits: {
            fileSize: FILE_LIMIT.filesize
        }
    }))
    async uploadPhoto(
        @UploadedFile() file,
        @Body() body: PhotoDto.CreatePhotoDto,
    ): Promise<ResultInterface> {
        const photoProfiles: Omit<Photo, 'id' | 'createdAt'> = {
            mimetype: file.mimetype,
            originalname: file.originalname,
            size: file.size,
            path: file.path,
            filename: file.filename,
            destination: file.destination,
            type: body.type,
        };
        const createdPhoto = await this.photoService.upload(photoProfiles);
        return {
            statusCode: 200,
            success: true,
            data: {
                id: createdPhoto.id,
                path: file.path,
                originalname: file.originalname,
            },
        };
    }

    @ApiOperation({ description: '根据type获取图片' })
    @ApiQuery({
        description: '0:文章的图片, 1:相册墙',
        name: 'type',
        enum: [PhotoDto.PHOTO_TYPE.POST, PhotoDto.PHOTO_TYPE.WALL],
        example: PhotoDto.PHOTO_TYPE.WALL,
    })
    @ApiQuery({ name: 'page', example: 1 })
    @ApiQuery({ name: 'pageSize', example: 10 })
    @Get()
    async getPhotos(
        @Query('type') type: PhotoDto.PHOTO_TYPE,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
    ): Promise<ResultInterface> {
        const photos = await this.photoService.findAndCount(type, page, pageSize);
        return {
            success: true,
            message: SuccessMessage.Photo.OK,
            data: photos,
            statusCode: 200,
        };
    }

    @ApiOperation({ description: '删除指定图片' })
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deletePhoto(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<ResultInterface> {
        await this.photoService.deleteOneById(id);
        return {
            success: true,
            message: SuccessMessage.Photo.DELETE,
            statusCode: 200,
        };
    }
}
