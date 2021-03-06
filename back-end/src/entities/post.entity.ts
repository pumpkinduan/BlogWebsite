import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostInterface } from 'common/interfaces/index.interface';
import { Comment } from './index';
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: PostInterface.STATUS.DRAFTED })
  status: PostInterface.status;

  @Column({ default: 'Pumpkin', length: 32 })
  author: string;

  @Column('longtext', { nullable: false })
  content: string;

  @Column({ length: 2048, nullable: false })
  description: string;

  // 会自动转换数组为字符串
  @Column('simple-array', { nullable: false })
  tags: string[]; // 'js, ts, css'

  @Column({ nullable: false })
  category: string;

  @OneToMany(
    () => Comment,
    comment => comment.post,
  )
  comments: Comment[];

  @Column({ default: 0 })
  totalComments: number;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ nullable: false })
  title: string;

  //自动生成
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt?: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  browsers: number;
}
