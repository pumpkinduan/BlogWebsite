import {
    Body,
    Controller,
    Delete,
    Inject,
    Post,
    UploadedFiles,
    UploadedFile,
    UseInterceptors,
    ParseIntPipe,
    Param,
    Get,
    Query,
    UseGuards
} from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import {
    ResultInterface,
    SuccessMessage,
} from 'common/interfaces/index.interface';
import { Photo } from 'entities';
import { PhotoService } from './photo.service';
import * as fs from 'fs';
import { PhotoDto } from 'common/dto/index.dto';
import { FILE_LIMIT } from 'src/consts';
import { JwtAuthGuard } from 'src/guards/index.guard'


const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 由于multer只会在初始化时创建目录(destination为字符串)，所以需要自己
        // 根据创建时间动态生成 文件目录
        const date = new Date();
        const dir = `statics\\uploads\\${date.getFullYear()}-${date.getMonth() +
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
@ApiBearerAuth()
@UseGuards(new JwtAuthGuard())
export class PhotoController {
    constructor(@Inject(PhotoService) readonly photoService: PhotoService) { }

    @Post('upload')
    @ApiOperation({ description: '上传单张图片, 如头像，文章封面' })
    @UseInterceptors(FileInterceptor('file', {
        storage, limits: {
            fileSize: FILE_LIMIT.fileSize
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
        const createdPhoto = await this.photoService.uploadFile(photoProfiles, body);
        return {
            statusCode: 200,
            success: true,
            data: {
                id: createdPhoto.id,
                path: createdPhoto.path,
                originalname: createdPhoto.originalname,
            },
        };
    }

    @Post('uploads')
    @ApiOperation({ description: '上传多张图片, 如文章内的图片，相册墙' })
    @UseInterceptors(FilesInterceptor('files', FILE_LIMIT.maxCount, {
        storage, limits: {
            fileSize: FILE_LIMIT.fileSize
        }
    }))
    async uploadPhotos(
        @UploadedFiles() files,
        @Body() body: PhotoDto.CreatePhotoDto,
    ): Promise<ResultInterface> {
        const photosProfiles: Omit<Photo, 'id' | 'createdAt'>[] = files.map((file) => ({
            mimetype: file.mimetype,
            originalname: file.originalname,
            size: file.size,
            path: file.path,
            filename: file.filename,
            destination: file.destination,
            type: body.type,
        }));
        const createdPhotos = await this.photoService.uploadFiles(photosProfiles);
        return {
            statusCode: 200,
            success: true,
            data: createdPhotos.map((createdPhoto) => ({
                id: createdPhoto.id,
                path: createdPhoto.path,
                originalname: createdPhoto.originalname,
            })),
        };
    }

    @ApiOperation({ description: '根据type获取图片' })
    @ApiQuery({
        description: '文章的图片, 相册墙, 头像',
        name: 'type',
        enum: PhotoDto.PHOTO_TYPE,
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

    @ApiOperation({ description: '删除指定图片' })
    @Delete()
    async deletePhotoByPath(
        @Query('path') path: string,
    ): Promise<ResultInterface> {
        await this.photoService.deleteOneByPath(path);
        return {
            success: true,
            message: SuccessMessage.Photo.DELETE,
            statusCode: 200,
        };
    }
}
