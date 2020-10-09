import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { UserInterface } from 'common/interfaces/index.interface'
import { Comment } from './comment.entity'
@Entity()
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    avatar: string;
    @Column()
    nickname: string;
    @Column()
    email: string;
    @Column()
    role: UserInterface.ROLE;
    @OneToMany(type => Comment, comment => comment.related_user)
    comments: Comment[]; // 用户关联的留言，与留言为一对多关系
    // @Column()
    // related_post_ids: string[]; // 用户关联的文章，与文章为多对多关系
    @Column('json')
    profiles?: UserInterface.SuperUserProfile;

}