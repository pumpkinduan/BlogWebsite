import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User, Comment } from './'

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;

    @ManyToOne(() => User, user => user.replies)
    targetUser: User; // 回复的目标用户

    @ManyToOne(() => User)
    sourceUser: User; // 回复的来源用户

    @ManyToOne(() => Comment, comment => comment.replies)
    comment: Comment;
}   