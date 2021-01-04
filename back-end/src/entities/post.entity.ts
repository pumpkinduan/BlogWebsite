import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { PostInterface } from 'common/interfaces/index.interface';
import { Comment } from './index';
@Entity()
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  status: PostInterface.status;

  @Column({ default: 'Pumpkin' })
  author: string;

  @Column('text')
  content: string;

  @Column()
  description: string;

  // 会自动转换数组为字符串
  @Column('simple-array')
  tags: string[]; // 'js, ts, css'

  @OneToMany(
    () => Comment,
    comment => comment.post,
  )
  comments: Comment[];

  @Column()
  coverUrl: string;

  @Column()
  title: string;

  //自动生成
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt?: string;

  @DeleteDateColumn({ comment: '删除时间' })
  deletedAt: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  browsers: number;
}
