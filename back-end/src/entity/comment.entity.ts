import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { CommentInterface } from 'common/interfaces/index.interface'
import { User } from './user.entity'
import { Post } from './post.entity'
type NeverPick<T, U> = {
    [P in Exclude<keyof T, U>]: T[P];
};
@Entity()
export class Comment {
    @PrimaryColumn()
    id: string;
    @Column()
    content: string;
    // @Column('timestamp without time zone')
    // created_at: string;
    @ManyToOne(type => User, user => user.comments)
    related_user: User; // 留言关联的用户，与用户为一对一关系
    // @Column()
    // children: string[] // 回复
    @ManyToOne(type => Post, post => post.comments)
    related_post: Post;
}