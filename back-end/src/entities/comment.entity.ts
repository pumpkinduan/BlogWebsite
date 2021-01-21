import { COMMENT_TYPE } from 'src/common/dto/index.dto';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User, Post, Reply } from './'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    content: string;

    //自动生成
    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;

    @ManyToOne(() => User, user => user.comments, { cascade: true, onDelete: 'CASCADE' })
    sourceUser: Omit<User, 'password' | 'replies' | 'comments'>; // 留言关联的用户，与用户为多对一关系

    @OneToMany(() => Reply, reply => reply.comment)
    replies: Reply[]// 回复  

    @ManyToOne(() => Post, post => post.comments, { cascade: true, onDelete: 'CASCADE', nullable: true })
    post: Pick<Post, 'id'>;

    @Column({ nullable: false, comment: '留言所属的类别' })
    type: COMMENT_TYPE
}   