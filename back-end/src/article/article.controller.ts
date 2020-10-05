import { Controller, Get, Param } from '@nestjs/common';
import {
  ArticleDto,
  createArticleDto,
  basicArticleDto,
  detailArticleDto,
} from 'dto/index.dto';
@Controller('articles')
export class ArticleController {
  @Get()
  getArticles(): basicArticleDto[] {
    return [
      {
        id: '12',
        coverUrl:
          'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
        title: '你好啊，欢迎学习React技术全家桶',
        comments: '123',
        createdAt: '3天前',
        likes: '1235',
        visitors: '123',
      },
    ];
  }

  @Get(':id')
  getDetail(@Param('id') id: string): detailArticleDto {
    return {
      id: '12',
      coverUrl:
        'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
      title: '你好啊，欢迎学习React技术全家桶',
      comments: '123',
      createdAt: '3天前',
      likes: '1235',
      visitors: '123',
      content: 'sof',
      status: ['published'],
      author: 'Pumpkin',
      downloads: '88',
      description: 'hs',
      tags: ['js', 'nest'],
    };
  }
}
