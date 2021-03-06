import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface, USER_TYPE } from 'common/interfaces/index.interface';
import { Comment, Reply } from './index';
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	username: string;

	@Column({ nullable: false })
	email: string;

	@Column({ default: '' })
	avatar: string;

	@Column({ nullable: false })
	type: USER_TYPE;

	@Column({ nullable: true })
	webUrl?: string;

	@OneToMany(
		() => Comment,
		comment => comment.sourceUser,
	)
	comments: Comment[]; // 用户关联的留言，与留言为一对多关系

	@OneToMany(
		() => Reply,
		reply => reply.sourceUser,
	)
	replies: Reply[];

	@Column('json', { nullable: true })
	profiles?: UserInterface.AdminProfiles;

	@Column({ nullable: false })
	password: string;
}
