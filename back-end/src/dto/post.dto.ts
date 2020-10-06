type basicPostString = Record<'coverUrl' | 'title' | 'createdAt', string>;
type basicPostNumber = Record<
  'likes' | 'visitors' | 'comments' | 'id' | 'downloads',
  number
>;
// 文章状态
export type status = 'published' | 'drafted' | 'updated' | 'deleted';
// 文章列表
export interface basicPostDto extends basicPostString, basicPostNumber {}

// 文章详情
export interface detailPostDto extends basicPostDto {
  status: status[];
  author?: string;
  content: string; // 文章内容，格式为html字符串
  description: string;
  tags: string[];
}
export type createPostDto = Pick<
  detailPostDto,
  | 'content'
  | 'description'
  | 'tags'
  | 'status'
  | 'author'
  | 'title'
  | 'coverUrl'
>;
export class PostDto {
  static createPostDto: createPostDto;
  static updatePostDto: createPostDto;
}
