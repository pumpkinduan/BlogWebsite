import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany } from 'typeorm';
import { PostInterface } from 'common/interfaces/index.interface'
import { Comment, User } from './index'
import { NeverPick } from 'common/generic'
@Entity()
export class Post {
    @PrimaryColumn({ generated: 'uuid' })
    id: string;

    @Column()
    status: PostInterface.status;

    @Column({ default: 'Pumpkin' })
    author: string;

    @Column('text')
    content: string;

    @Column()
    description: string;

    // 会自动转换数组为字符串
    @Column('simple-array')
    tags: string[]; // 'js, ts, css'

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToMany(type => User, user => user.posts)
    users: User[];

    @Column()
    coverUrl: string;

    @Column()
    title: string;

    //自动生成 
    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;

    @UpdateDateColumn({ comment: '更新时间' })
    updatedAt?: string;

    @DeleteDateColumn({ comment: '删除时间' })
    deletedAt: string;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    visitors: number;

    @Column({ default: 0 })
    downloads: number;
}