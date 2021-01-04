import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User, Comment } from './'

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    content: string;

    //自动生成
    @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
    createdAt: number;

    @ManyToOne(() => User, user => user.replies)
    targetUser: Omit<User, 'password' | 'replies' | 'comments'>; // 回复的目标用户

    @ManyToOne(() => User)
    sourceUser: Omit<User, 'password' | 'replies' | 'comments'>; // 回复的来源用户

    @ManyToOne(() => Comment, comment => comment.replies)
    comment: Pick<Comment, 'id'>;
}   