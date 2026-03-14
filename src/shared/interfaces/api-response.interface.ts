
export interface ApiResult<T = any> {
    success: boolean;
    message?: string;
    data?: T | T[] | any;
    statusCode?: number;
    page?: number;
    total?: number;
    totalPages?: number;
}