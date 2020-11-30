import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany } from 'typeorm';
import { UserInterface, TYPE } from 'common/interfaces/index.interface'
import { Comment, Post } from './index'
@Entity()
export class User {
    @PrimaryColumn({ generated: 'uuid' })
    id: string;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    type: TYPE;

    @Column()
    webUrl: string;

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]; // 用户关联的留言，与留言为一对多关系

    @Column('json', { nullable: true })
    profiles?: UserInterface.SuperUserProfile;

    @Column({ nullable: true })
    password?: string
}