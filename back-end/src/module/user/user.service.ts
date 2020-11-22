import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { UserDto } from 'common/dto/index.dto'
import { User } from 'entity'
import { UserInterface } from 'common/interfaces/index.interface';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) readonly userRepository: Repository<User>) {

    }
    async create(createUser: UserDto.CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUser);
    }
    async deleteById(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
    async findAndCount(
        page: number,
        pageSize: number,
        role: UserInterface.ROLE
    ): Promise<[User[], number]> {
        // 分页
        const offset = page * pageSize - pageSize;
        // 查询 权限为role的用户，并按照分页返回指定条数
        return await this.userRepository.findAndCount({
            skip: offset,
            take: pageSize,
            where: { role: role }
        });
    }
}
