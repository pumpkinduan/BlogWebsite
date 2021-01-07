import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoDto } from 'common/dto/index.dto';
import { Photo } from 'entities';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
    constructor(@InjectRepository(Photo) readonly photoRepository: Repository<Photo>) { }
    async upload(createPhotoDto: PhotoDto.CreatePhotoDto) {
        return await this.photoRepository.save(createPhotoDto);
    }
}
