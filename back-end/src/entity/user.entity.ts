import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { UserInterface, USER_TYPE } from 'common/interfaces/index.interface';
import { Comment } from './index';
import { IsDefined, IsEnum } from 'class-validator';
@Entity()
export class User {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @IsEnum(USER_TYPE)
  type: USER_TYPE;

  @Column({ nullable: true })
  webUrl?: string;

  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[]; // 用户关联的留言，与留言为一对多关系

  @Column('json', { nullable: true })
  profiles?: UserInterface.SuperUserProfile;

  @Column()
  @IsDefined()
  password: string;
}
