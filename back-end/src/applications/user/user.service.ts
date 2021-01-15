import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { UserDto } from 'common/dto/index.dto'
import { User } from 'entities'
import { USER_TYPE } from 'common/interfaces/index.interface';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) readonly userRepository: Repository<User>
    ) { }

    /**
     * 创建用户
     * @param createUser 用户信息
     */
    async create(createUser: UserDto.CreateUserDto): Promise<void> {
        await this.userRepository.save(createUser);
    }

    /**
     * 通过用户名 查询用户
     * @param username 用户名
     */
    async findOneByUserName(username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username } })
    }

    /**
     * 通过邮箱 查询用户
     * @param email 用户名
     */
    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email }, select: ['id', 'password', 'email'] })
    }

    /**
     * 通过id 查询用户
     * @param id 用户id
     */
    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne(id, { select: ['email', 'id', 'profiles', 'type', 'username', 'webUrl'] });
    }

    /**
     * @param id 用户id
     * @param updateUserInfoDto 用户的基础信息
     */
    async updateUserInfo(id: number, updateUserInfoDto: UserDto.UpdateUserInfoDto): Promise<void> {
        const existing_user = await this.userRepository.findOne(id);
        if (!existing_user) throw new NotFoundException(`保存信息失败，ID 为${id}的用户不存在`);
        await this.userRepository.update(id, updateUserInfoDto);
    }

    /**
     * @param id 管理员id
     * @param updateProfileDto 管理员的基础信息
     */
    async updateAdminProfiles(id: number, updateProfileDto: UserDto.UpdateAdminProfilesDto): Promise<void> {
        const existing_admin = await this.userRepository.findOne(id);
        if (!existing_admin) throw new NotFoundException(`保存信息失败，ID 为${id}的管理员不存在`);
        await this.userRepository.update(id, { profiles: updateProfileDto });
    }

    /**
     * 通过id 删除用户
     * @param id 用户id
     */
    async deleteById(id: number): Promise<void> {
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
    ): Promise<User[]> {
        const offset = page * pageSize - pageSize;
        const select: (keyof User)[] = ['email', 'id', 'username'];
        if (type === USER_TYPE.NORMAL) { select.push('webUrl') }
        if (type === USER_TYPE.ADMIN) { select.push('profiles') }
        return await this.userRepository.find({
            skip: offset,
            take: pageSize,
            where: { type: type },
            select: select
        });
    }
}
