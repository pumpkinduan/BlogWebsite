import { Body, Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResultInterface } from 'common/interfaces/index.interface';
import { Photo } from 'entities';
import { PhotoService } from './photo.service';
const multer = require('multer');
@Controller('photo')
@ApiTags('图片')
export class PhotoController {
    constructor(@Inject(PhotoService) readonly photoService: PhotoService) { }

    @Post('upload')
    @ApiOperation({ description: '表单字段名为：photo' })
    @UseInterceptors(FileInterceptor('photo', {
        storage: multer.diskStorage({
            destination: `${process.cwd()}/statics/uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
            filename: function (req, file, cb) {//指定文件名
                cb(null, `${Date.now() + ''.slice(-6)}_${file.originalname}`)
            },
        })
    }))
    async uploadPhoto(@UploadedFile() photo, @Body() body): Promise<ResultInterface> {
        const photoProfiles: Omit<Photo, 'id' | 'createdAt'> = {
            mimetype: photo.mimetype,
            originalname: photo.originalname,
            size: photo.size,
            path: photo.path,
            filename: photo.filename,
            destination: photo.destination,
            type: body.type
        }
        const createdPhoto = await this.photoService.upload(photoProfiles);
        return {
            statusCode: 200,
            success: true,
            data: {
                id: createdPhoto.id,
                path: photo.path,
                originalname: photo.originalname,
            }
        }
    }
}

