import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { PostInterface } from 'common/interfaces/index.interface'
import { Comment } from './comment.entity'
type NeverPick<T, U> = {
    [P in Exclude<keyof T, U>]: T[P];
};
@Entity()
export class Post {

    @PrimaryColumn()
    id: string;
    @Column()
    status: PostInterface.status;
    @Column({ default: 'Pumpkin' })
    author?: string;
    @Column('text')
    content: string;
    @Column()
    description: string;
    @Column()
    tags: string; // 'js, ts, css'
    @OneToMany(type => Comment, comment => comment.related_post)
    comments?: Comment[];
    @Column()
    coverUrl: string;
    @Column()
    title: string;
    // @Column('timestamp without time zone')
    // createdAt: string;
    @Column({ default: 0 })
    likes?: number;
    @Column({ default: 0 })
    visitors?: number;
    @Column({ default: 0 })
    downloads?: number;
}