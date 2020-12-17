import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs'
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResult = exception.getResponse();
        const baseJson = {
            statusCode: status,
            timestamp: Date.now(),
            time: dayjs(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
            path: request.url,
            message: exceptionResult
        };
        const json = typeof exceptionResult === 'object' ? Object.assign(baseJson, exceptionResult) : baseJson;

        response
            .status(status)
            .json(json);
    }
}