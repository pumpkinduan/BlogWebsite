import { PostDto, userDto, commentDto } from 'dto/index.dto';
export class Example {
	user: userDto.basicUserDto = {
		id: 524,
		comment_ids: [45],
		nickname: 'Tom',
		related_post_ids: [4, 5],
		email: '545436@qq.com',
		avatar: '123.jpg',
	}
	superUser: userDto.superUserDto = {
		profiles: {
			nickname: 'Pumpkin',
			github: 'pumpkinduan.github',
			'avatar': 'pumpkin.jpg',
			'brief': '即将拥有八块腹肌',
			'email': 'test@qq.com',
			'notice': '2.1版本敬请期待喔',
		},
		'moment_ids': [121],
		'word_ids': [544]
	}
	commentListItem: commentDto.basicCommentDto = {
		id: 1212,
		content: '你好啊',
		created_at: '3 days ago',
		related_user: this.user,
		children: []
	};
	postListItem: PostDto.basicPostDto = {
		id: 12,
		coverUrl:
			'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
		title: '你好啊，欢迎学习React技术全家桶',
		createdAt: '3天前',
		likes: 1235,
		visitors: 12,
		downloads: 88,
	};
	postDetail: PostDto.detailPostDto = {
		id: 11,
		coverUrl:
			'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
		title: '你好啊，欢迎学习React技术全家桶',
		createdAt: '3天前',
		likes: 1235,
		visitors: 123,
		content: 'sof',
		status: ['published'],
		author: 'Pumpkin',
		downloads: 88,
		description: 'hs',
		tags: ['js', 'nest'],
		comments: [this.commentListItem],
	};

}
export const exampleInstance = new Example();
