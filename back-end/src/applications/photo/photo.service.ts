import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoDto } from 'common/dto/index.dto';
import { Photo } from 'entities';
import { unlink } from 'fs';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
    constructor(@InjectRepository(Photo) readonly photoRepository: Repository<Photo>) { }

    async upload(createPhotoDto: PhotoDto.CreatePhotoDto) {
        return await this.photoRepository.save(createPhotoDto);
    }

    async findAndCount(type: PhotoDto.PHOTO_TYPE, page = 1, pageSize = 10) {
        const offset = page * pageSize - pageSize;

        const photos = await this.photoRepository.find({
            where: {
                type: type
            },
            order: {
                createdAt: 'DESC'
            },
            select: ['id', 'createdAt', 'originalname', 'path'],
            skip: offset,
            take: pageSize
        })

        photos.forEach((photo) => {
            photo.path = photo.path.replace(/\\/gi, '/');
        })
        return photos;
    }

    async deleteOneById(id: number) {
        const photo = await this.photoRepository.findOne(id);
        if (!photo) {
            throw new NotFoundException('图片资源不存在');
        }
        await this.photoRepository.delete(id);
        return new Promise((resolve) => {
            // 删除文件数据
            unlink(photo.path, (err) => {
                if (err) throw err;
                resolve(true);
            })
        });
    }
}
