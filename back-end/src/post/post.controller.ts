import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  PostDto,
  createPostDto,
  basicPostDto,
  detailPostDto,
} from 'dto/index.dto';
@Controller('posts')
export class PostController {
  @Post()
  createPost(@Body() body: createPostDto) {
    console.log('body', body);

    return {
      success: true,
    };
  }

  @Get()
  getPosts(@Query('page') page: number): basicPostDto[] {
    return [
      {
        id: 12,
        coverUrl:
          'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
        title: '你好啊，欢迎学习React技术全家桶',
        comments: 123,
        createdAt: '3天前',
        likes: 1235,
        visitors: 12,
        downloads: 88,
      },
    ];
  }

  @Get(':id')
  getPostDetail(@Param('id') id: number): detailPostDto {
    return {
      id: id,
      coverUrl:
        'https://2heng.xin/wp-content/uploads//2019/12/2572384-1024x640.jpg',
      title: '你好啊，欢迎学习React技术全家桶',
      comments: 123,
      createdAt: '3天前',
      likes: 1235,
      visitors: 123,
      content: 'sof',
      status: ['published'],
      author: 'Pumpkin',
      downloads: 88,
      description: 'hs',
      tags: ['js', 'nest'],
    };
  }
}
