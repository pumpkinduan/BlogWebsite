import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoDto } from 'common/dto/index.dto';
import { Photo } from 'entities';
import { unlink } from 'fs';
import { Repository } from 'typeorm';
import { UserService } from '..//user/user.service';
@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo) readonly photoRepository: Repository<Photo>,
        @Inject(UserService) readonly userService: UserService,
    ) { }

    async uploadFile(photoProfiles: Omit<Photo, 'id' | 'createdAt'>, createPhotoDto: PhotoDto.CreatePhotoDto) {
        const result = await this.photoRepository.save(photoProfiles);
        if (createPhotoDto.type === PhotoDto.PHOTO_TYPE.AVATAR) {
            // 上传的是头像，则需要更新指定用户的avatar
            this.userService.updateUserInfo(createPhotoDto.userId, { avatar: result.path })
        }
        return result;
    }


    async uploadFiles(photosProfiles: Omit<Photo, 'id' | 'createdAt'>[]) {
        const result = await this.photoRepository.save(photosProfiles);
        return result;
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

    async deleteOneByPath(path: string) {
        const photo = await this.photoRepository.findOne({ where: { path } });
        if (!photo) {
            throw new NotFoundException('图片资源不存在');
        }
        await this.photoRepository.delete(photo.id);
        return new Promise((resolve) => {
            // 删除文件数据
            unlink(photo.path, (err) => {
                if (err) throw err;
                resolve(true);
            })
        });
    }
}
