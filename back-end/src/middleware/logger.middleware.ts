import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs'
import { ReqLoggerInterface } from 'common/interfaces/index.interface'
import { createLoggerPrefix } from 'utils'
const fs = require('fs')
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const requestLog: ReqLoggerInterface = {
            requestTime: dayjs().format('YYYY/MM/DD hh:mm:ss'),
            path: req.path,
            originalUrl: req.originalUrl,
            method: req.method,
            hostname: req.hostname,
            ip: req.ip,
            body: req.body,
            params: req.params
        }
        const file_prefix_name = createLoggerPrefix(req.originalUrl);
        // 将posts帖子相关的请求 写入logger.txt文件中
        fs.appendFile(`src/logger/${file_prefix_name}_logger.txt`, JSON.stringify(requestLog) + '\r\n', (err) => {
            if (err) throw err;
        })
        next();
    }
}