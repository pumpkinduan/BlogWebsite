import { Injectable } from '@nestjs/common';
import { Post } from 'entity/post.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) readonly postRepository: Repository<Post>) { }
    async findAndCount(page: number, pageSize: number): Promise<[Post[], number]> {
        // 分页
        const offset = page * pageSize - pageSize;
        return await this.postRepository.findAndCount({ skip: offset, take: pageSize });
    }

    async create(createPost: Post): Promise<void> {
        await this.postRepository.save(createPost);
    }

    async findOne(id: string): Promise<Post> {
        return await this.postRepository.findOne(id);
    }
}
