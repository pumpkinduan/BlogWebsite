export * from './formateDate'

// 根据访问的url来创建logger文件的前缀名，posts_logger，users_logger...
export const createLoggerPrefix = (originalUrl: string) => {
    // 匹配 /posts/create 中的 /posts, 并返回 posts
    const reg = /\/(\w+)/;
    return reg.exec(originalUrl)[1];
}