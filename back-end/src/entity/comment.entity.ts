import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity'
import { Post } from './post.entity'
@Entity()
export class Comment {
    @PrimaryColumn({ generated: 'uuid' })
    id: string;
    @Column()
    content: string;
    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;
    @ManyToOne(type => User, user => user.comments)
    user: User; // 留言关联的用户，与用户为多对一关系
    @Column({ type: 'simple-array' })
    children: string[]// 回复
    @ManyToOne(type => Post, post => post.comments)
    post: Post;
}