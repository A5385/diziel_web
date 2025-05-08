import { AxiosError } from 'axios';
import notify from './AxiosNotify';

const isDev = process.env.NODE_ENV === 'development';

export const handleGlobalError = (error: AxiosError<{ message: string }>) => {
    let message = 'An unexpected error occurred'; // Default fallback message

    if (error.response) {
        const status = error.response.status;
        message = error.response.data?.message || mapErrorStatus(status);

        if (isDev) {
            console.error(`[Axios Error] Status: ${status}, Message: ${message}`);
        }
    } else if (error.request) {
        message = 'Network error occurred. Please check your connection.';

        if (isDev) {
            console.error('[Axios Error] Request failed:', error.request);
        }
    } else {
        message = `Unexpected error: ${error.message}`;

        if (isDev) {
            console.error('[Axios Error] Unexpected error:', error.message);
        }
    }

    // Notify the user
    notify({ message, type: 'error' });
};

const mapErrorStatus = (status: number): string => {
    const messages: Record<number, string> = {
        400: 'Bad Request - Invalid input data',
        401: 'Unauthorized - Please log in',
        403: 'Forbidden - Access denied',
        404: 'Not Found - The requested resource could not be found',
        408: 'Request Timeout - The server timed out waiting for the request',
        429: 'Too Many Requests - You have exceeded the allowed request limit',
        500: 'Internal Server Error - An unexpected error occurred',
        502: 'Bad Gateway - The server is temporarily unavailable',
        503: 'Service Unavailable - Please try again later',
        504: 'Gateway Timeout - The server did not respond in time',
    };
    return messages[status] || 'An unexpected error occurred';
};
