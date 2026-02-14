
export interface ApiResult<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    statusCode?: number;
}