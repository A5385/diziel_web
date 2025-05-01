import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse() as
            | string
            | { message?: string; error?: string };

        const message =
            typeof exceptionResponse === 'string'
                ? exceptionResponse
                : exceptionResponse.message || null;

        const error =
            typeof exceptionResponse === 'string'
                ? exception.name
                : typeof exceptionResponse === 'object' && 'error' in exceptionResponse
                  ? exceptionResponse.error
                  : exception.name;

        response.status(statusCode).json({
            ok: false,
            status: statusCode,
            message: '',
            error: {
                message: error,
                error: message,
            },
            // message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
