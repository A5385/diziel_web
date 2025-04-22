import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage = 'Internal server error';

        // Extract useful information from the exception message
        const detailedMessage = exception.message.split('\n').slice(0, 3).join(' '); // Capture the first few lines

        switch (exception.code) {
            case 'P2002':
                status = HttpStatus.CONFLICT;
                errorMessage = `Duplicate record: ${detailedMessage}`;
                break;
            case 'P2025':
                status = HttpStatus.NOT_FOUND;
                errorMessage = `Record not found: ${detailedMessage}`;
                break;
            case 'P2016':
                status = HttpStatus.BAD_REQUEST;
                errorMessage = `Invalid record: ${detailedMessage}`;
                break;
            default:
                errorMessage = detailedMessage; // Use the detailed error from Prisma
                status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        response.status(status).json({
            statusCode: status,
            message: errorMessage + exception.message,
            error: exception.code,
            // detailedError: exception.message, // Include the full error for debugging
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
