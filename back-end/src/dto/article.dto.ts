export interface basicArticleDto {
  id: string;
  coverUrl: string;
  title: string;
  createdAt: string;
  likes: string; // 点赞数量
  visitors: string; // 访客数量
  comments: string; // 留言数量
}
// 文章状态
export type status = 'published' | 'drafted' | 'updated' | 'deleted';
// 一篇文章所具备的属性
export interface detailArticleDto extends basicArticleDto {
  status: status[];
  author?: string;
  content: string; // 文章内容，格式为html字符串
  description: string;
  tags: string[];
  downloads: number | string;
}
export interface createArticleDto {
  author?: string;
  content: string;
  description: string;
  tags: string[];
  coverUrl: string;
  title: string;
}
export interface deleteArticleDto {
  id: string;
}
export class ArticleDto {
  static createArticleDto: createArticleDto;
  static deleteArticleDto: deleteArticleDto;
  static updateArticleDto: createArticleDto;
}
