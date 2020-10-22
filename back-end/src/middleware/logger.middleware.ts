import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs'
import { ReqLoggerInterface } from 'common/interfaces/index.interface'
const fs = require('fs')
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const requestLog: ReqLoggerInterface = {
            requestTime: dayjs().format('YYYY/MM/DD hh:mm:ss'),
            path: req.path,
            originalUrl: req.originalUrl,
            hostname: req.hostname,
            ip: req.ip,
        }
        // 将posts帖子相关的请求 写入logger.txt文件中
        fs.appendFile('src/logger.txt', 'Request...' + JSON.stringify(requestLog) + '\r\n', (err) => {
            if (err) throw err;
        })
        console.log('Request...', requestLog);
        next();
    }
}