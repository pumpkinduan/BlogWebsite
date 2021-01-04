import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User, Post, Reply } from './'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ default: '' })
    content: string;

    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;

    @ManyToOne(() => User, user => user.comments, { cascade: true })
    sourceUser: Pick<User, 'id' | 'type' | 'username' | 'email' | 'webUrl' | 'profiles'>; // 留言关联的用户，与用户为多对一关系

    @OneToMany(() => Reply, reply => reply.comment)
    replies: Reply[]// 回复  

    @ManyToOne(() => Post, post => post.comments, { cascade: true })
    post: Pick<Post, 'id'>;
}   