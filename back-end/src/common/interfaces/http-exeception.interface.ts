import { HttpStatus } from '@nestjs/common'
export interface exceptionResultInterface {
    statusCode: HttpStatus,
    timestamp: number,
    time: string,
    path: string,
    error: string;
    message: string | string[];
}