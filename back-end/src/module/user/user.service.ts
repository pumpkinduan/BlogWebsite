import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { UserDto } from 'common/dto/index.dto'
import { User } from 'entity'
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) readonly userRepository: Repository<User>) {

    }
    async create(createUser: UserDto.CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUser);
    }
}
