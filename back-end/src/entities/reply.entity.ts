import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User, Comment } from './'

type replyId = string;
@Entity()
export class Reply {
    @PrimaryColumn()
    id: string;

    @Column()
    content: string;

    @CreateDateColumn({ comment: '创建时间' })
    createdAt: string;

    @ManyToOne(() => User)
    targetUser: User; // 回复的目标用户

    @ManyToOne(() => User)
    sourceUser: User; // 回复的来源用户
}   