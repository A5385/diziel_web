import { OperationType } from 'src/types/response';

export const mapStatusCode = {
    success: {
        create: 201, // Created
        login: 200, // OK
        logout: 204, // No Content
        update: 200, // OK
        assign: 201, // Created
        delete: 204, // No Content
        findAll: 200, // OK
        findBy: 200, // OK
        findById: 200, // OK
        sendEmail: 202, // Accepted
        deleteFile: 204, // No Content
        saveFile: 201,
        sendSMS: 200,
        'db-connect': 200,
        token: 200,
        'verify-phone': 200,
        'verify-otp': 200,
        'set-password': 200,
    } satisfies Record<OperationType, number>,
    error: {
        create: 400, // Bad Request
        login: 401, // Unauthorized
        logout: 400, // Bad Request
        update: 400, // Bad Request
        assign: 400, // Bad Request
        delete: 404, // Not Found
        findAll: 500, // Internal Server Error
        findBy: 404, // Not Found
        findById: 404, // Not Found
        sendEmail: 500, // Internal Server Error
        deleteFile: 500, // Internal Server Error
        saveFile: 500,
        sendSMS: 500,
        'db-connect': 500,
        token: 401,
        'verify-phone': 401,
        'verify-otp': 401,
        'set-password': 401,
    } satisfies Record<OperationType, number>,
};
