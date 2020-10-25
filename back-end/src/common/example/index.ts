import { PostInterface, UserInterface, CommentInterface } from 'common/interfaces/index.interface';
export class Example {
	basicUser: UserInterface.BasicUser = {
		role: UserInterface.ROLE.BasicUser,
		id: '524',
		comment_ids: ['45'],
		nickname: 'Tom',
		related_post_ids: ['4', '5'],
		email: '545436@qq.com',
		avatar: '123.jpg',
	}
	superUser: UserInterface.SuperUser = {
		role: UserInterface.ROLE.SuperUser,
		profiles: {
			nickname: 'Pumpkin',
			github: 'pumpkinduan.github',
			'avatar': 'pumpkin.jpg',
			'brief': '即将拥有八块腹肌',
			'email': 'test@qq.com',
			'notice': '2.1版本敬请期待喔',

		},
		'moment_ids': ['121'],
		'word_ids': ['544']
	}
	commentListItem: CommentInterface.BasicComment = {
		id: '1212',
		content: '你好啊',
		createdAt: '3 days ago',
		user: this.basicUser,
		children: [],
		// related_post_id: '564a'
	};
	postListItem: PostInterface.BasicPost = {
		id: '12',
		coverUrl:
			'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
		title: '你好啊，欢迎学习React技术全家桶',
		createdAt: '3天前',
		likes: 1235,
		visitors: 12,
		downloads: 88,
	};
	postDetail: PostInterface.DetailPost = {
		id: '11',
		coverUrl:
			'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
		title: '你好啊，欢迎学习React技术全家桶',
		createdAt: '3天前',
		likes: 1235,
		visitors: 123,
		content: 'sof',
		status: 'published',
		author: 'Pumpkin',
		downloads: 88,
		description: 'hs',
		tags: ['js', 'nest'],
		comments: ['5'],
	};

}
export const exampleInstance = new Example();
