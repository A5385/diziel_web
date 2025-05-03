export type LocaleType = 'en' | 'ar';
export type MethodType = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type OperationType =
    | 'delete'
    | 'update'
    | 'create'
    | 'findBy'
    | 'findById'
    | 'findAll'
    | 'sendEmail'
    | 'sendSMS'
    | 'assign'
    | 'saveFile'
    | 'deleteFile'
    | 'login'
    | 'logout'
    | 'db-connect'
    | 'token'
    | 'verify-phone'
    | 'verify-otp'
    | 'set-password';

export type ApiResponseType<T> = {
    ok: boolean; // Indicates success or failure
    status?: number; // HTTP status code
    message?: string; // Custom response message
    error?: {
        // Error details
        message: string; // Error message
        error: string | string[]; // Actual error object
    };
    data?: T; // Response payload
};
