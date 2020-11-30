export interface ReqLoggerInterface {
    path: string;
    ip: string;
    requestTime: string;
    originalUrl: string;
    [prop: string]: any;
}