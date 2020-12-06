// 定义通用的API接口返回数据类型
export interface ResultInterface<D = any> {
    statusCode: number;
    message?: string;
    success: boolean;
    data?: D;
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
        LISTS = '成功获取留言列表',
        OK = 'OK'
    }
    export enum User {
        LOGIN = '登录成功',
        REGISTER = '注册成功',
        CREATE = '成功创建用户',
        DELETE = '成功删除用户',
        OK = 'OK'
    }
}

export namespace FailedMessage {
    export enum Post {
        CREATE = '创建帖子失败',
        DELETE = '删除帖子失败',
        UPDATE = '更新帖子失败',
        FAILED = 'failed'
    }
    export enum Comment {
        CREATE = '创建留言失败',
        DELETE = '删除留言失败',
        LISTS = '获取留言列表失败',
        FAILED = 'failed'
    }
    export enum User {
        LOGIN = '账号或密码错误，请重新输入',
        REGISTER = '注册失败',
        CREATE = '创建用户失败',
        DELETE = '删除用户失败',
        FAILED = 'failed'
    }
}
