import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User, Post, Reply } from './'

@Entity()
export class Comment {
    @PrimaryColumn()
    id: string;

    @Column()
    content: string;

    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;

    @ManyToOne(() => User, user => user.comments)
    sourceUser: User; // 留言关联的用户，与用户为多对一关系

    @OneToMany(() => Reply, reply => reply.comment)
    replies: Reply[]// 回复  

    @ManyToOne(() => Post, post => post.comments)
    post: Post;
}   