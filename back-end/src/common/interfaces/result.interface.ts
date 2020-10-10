// 定义通用的API接口返回数据类型
export interface ResultInterface {
    statusCode: number;
    message?: string;
    success: boolean;
    data?: any;
}
export namespace SuccessMessage {
    export enum Post {
        CREATE = '成功创建帖子',
        DELETE = '成功删除帖子',
        UPDATE = '成功更新帖子',
        OK = 'OK'
    }
    export enum Comment {
        CREATE = '成功创建留言',
        DELETE = '成功删除留言',
        OK = 'OK'
    }
    export enum User {
        CREATE = '成功创建用户',
        DELETE = '成功删除用户',
        OK = 'OK'
    }
}
