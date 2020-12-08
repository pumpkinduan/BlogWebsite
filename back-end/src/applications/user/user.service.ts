import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { UserDto } from 'common/dto/index.dto'
import { User } from 'entities'
import { USER_TYPE } from 'common/interfaces/index.interface';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) readonly userRepository: Repository<User>) {

    }

    /**
     * 创建用户
     * @param createUser 用户信息
     */
    async create(createUser: UserDto.CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUser);
    }

    /**
     * 通过用户名 查询用户
     * @param username 用户名
     */
    async findOneByUserName(username: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { username } })
    }

    /**
     * 通过邮箱 查询用户
     * @param email 用户名
     */
    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email } })
    }

    /**
     * 通过id 查询用户
     * @param id 用户id
     */
    async findOneById(id: string): Promise<User | undefined> {
        return await this.userRepository.findOne(id)

    }

    /**
     * @param id 管理员id
     * @param updateProfileDto 管理员的基础信息
     */
    async updateAdminProfiles(id: string, updateProfileDto: UserDto.UpdateAdminProfilesDto): Promise<void> {
        const existing_admin = await this.userRepository.findOne(id);
        if (!existing_admin) throw new NotFoundException(`保存管理员信息失败，ID 为${id}的管理员不存在`);
        await this.userRepository.update(id, { 'profiles': updateProfileDto })
    }

    /**
     * 通过id 删除用户
     * @param id 用户id
     */
    async deleteById(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
    /**
     * 根据type查询用户，并按照分页返回指定条数
     * @param page 页码
     * @param pageSize 每一页的数量
     * @param type 用户类型
     */
    async findAndCount(
        page: number,
        pageSize: number,
        type: USER_TYPE
    ): Promise<[User[], number]> {
        const offset = page * pageSize - pageSize;
        return await this.userRepository.findAndCount({
            skip: offset,
            take: pageSize,
            where: { type: type }
        });
    }
}
