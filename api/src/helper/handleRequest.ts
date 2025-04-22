import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { translations } from 'src/helper/translations';
import { LoggerService } from 'src/microservices/shared/logger/logger.service';
import { ApiResponseType, LocaleType, OperationType } from 'src/types/backend';

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
        saveFile: 201, // Created
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
        saveFile: 500, // Internal Server Error
    } satisfies Record<OperationType, number>,
};

export const Context = {
    prisma: 'PRISMA',
    //////////////////////
    counts: 'COUNTS',
    //////////////////////
    auth: 'AUTH',
    user: 'USER',
};
export type ContextType = keyof typeof Context;

export function generateResponse<T>({ ok, status, message, error, data }: ApiResponseType<T>) {
    return { ok, status, message, error: error ?? undefined, data: data ?? undefined };
}

export function replacePlaceholders(
    template: string,
    replacements: Record<string, string | undefined>,
) {
    return template?.replace(/\{(\w+)\}/g, (_, key: string) =>
        key ? (replacements[key] ?? `${key}`) : `${key}`,
    );
}

interface HandleRequestProps<T> {
    fn: () => Promise<T>;
    method: OperationType;
    logger: LoggerService;
    context: ContextType;
    locale?: LocaleType;
    id?: string;
    by?: string;
    key?: string;
    name?: string;
    assigner?: string;
    assignerId?: string;
    assignTo?: string;
    assignToId?: string;
    errorMessageKey?: string;
    successMessageKey?: string;
    type?: 'Confirmation' | 'Activation';
    to?: string;
    object?: string;
    fileName?: string;
    filePath?: string;
    amount?: number;
    payer?: string;
    payee?: string;
}
export async function handleRequest<T>({
    fn,
    method,
    logger,
    context,
    locale = 'en',
    id,
    by,
    key,
    name,
    assigner,
    assignerId,
    assignTo,
    assignToId,
    errorMessageKey,
    successMessageKey,
    type,
    to,
    object,
    fileName,
    filePath,
    amount,
    payer,
    payee,
}: HandleRequestProps<T>): Promise<ApiResponseType<T>> {
    try {
        const result = await fn();

        logSuccess({
            logger,
            method,
            context,
            locale,
            name,
            id,
            by,
            key,
            assigner,
            assignerId,
            assignTo,
            assignToId,
            successMessageKey,
            type,
            to,
            object,
            fileName,
            filePath,
            amount,
            payer,
            payee,
        });

        const message = replacePlaceholders(translations[locale]?.success[method], {
            method,
            context,
            locale,
            name,
            id,
            by,
            key,
            assigner,
            assignerId,
            assignTo,
            assignToId,
            successMessageKey,
            type,
            to,
            object,
            fileName,
            filePath,
            amount: amount?.toString(),
            payer,
            payee,
        });

        return generateResponse({
            ok: true,
            status: mapStatusCode.success[method] || 200,
            data: result,
            message,
        });
    } catch (err) {
        const error = err as Error;
        logError({
            logger,
            method,
            context,
            error,
            locale,
            id,
            by,
            errorMessageKey,
        });

        const errorMessage = errorMessageKey
            ? translations[locale]?.success[errorMessageKey]
            : formatErrorMessage(error, locale);

        return generateResponse({
            ok: false,
            status: mapStatusCode.error[method] || 500,
            error: {
                message: error.message,
                error: JSON.stringify(error, null, 2),
            },
            message: errorMessage,
        });
    }
}

function logSuccess({
    logger,
    method,
    context,
    locale,
    name,
    id,
    by,
    key,
    assigner,
    assignerId,
    assignTo,
    assignToId,
    successMessageKey,
    type,
    to,
    object,
    fileName,
    filePath,
}: Omit<HandleRequestProps<any>, 'fn' | 'errorMessageKey'> & { successMessageKey?: string }) {
    const mapMethodMsg: Record<OperationType, object> = {
        create: { name, context },
        update: { id, context },
        delete: { id, context },
        assign: {
            assigner,
            assignerId,
            assignTo,
            assignToId,
            context,
        },
        findById: {
            id,
            context,
        },
        findBy: {
            by,
            key,
            context,
        },
        findAll: { context },
        sendEmail: { type, to, object, context },
        saveFile: { fileName, filePath, context },
        deleteFile: { fileName, filePath, context },
        login: {},
        logout: {},
    };
    const message = successMessageKey
        ? translations[locale ?? 'en']?.success[successMessageKey]
        : method;

    logger[method ?? 'info'](mapMethodMsg[method] ?? { message, context });
}

function logError({
    logger,
    method,
    context,
    error,
    locale,
    id,

    errorMessageKey,
}: {
    logger: LoggerService;
    method: OperationType;
    context: string;
    error: Error;
    locale: LocaleType;
    id?: string;
    by?: string;
    errorMessageKey?: string;
}) {
    const errorMessage = errorMessageKey && translations[locale]?.success[errorMessageKey];
    const translatedContext = `[${method.toUpperCase()}] ${context}`;

    switch (method) {
        case 'create':
            logger.errorCreate({ context: translatedContext, error });
            break;
        case 'update':
            logger.errorUpdate({ id: id || '', context: translatedContext, error });
            break;
        case 'delete':
            logger.errorDelete({ id: id || '', context: translatedContext, error });
            break;
        case 'assign':
            logger.errorAssign({
                assigner: '',
                assignerId: '',
                assignTo: '',
                assignToId: '',
                context: translatedContext,
                error,
            });
            break;
        default:
            logger.error({
                message: errorMessage || error.message,
                context: translatedContext,
                trace: error.stack,
            });
    }
}

function formatErrorMessage(error: Error, locale: LocaleType): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return formatPrismaError(error, locale);
    }
    if (error instanceof BadRequestException) {
        return formatValidationError(error, locale);
    }
    return translations[locale]?.success['error'] || 'An unexpected error occurred.';
}

function formatPrismaError(
    error: Prisma.PrismaClientKnownRequestError,
    locale?: LocaleType,
): string {
    const messages = translations[locale ?? 'en']?.prismaErrors;
    switch (error.code) {
        case 'P2002':
            return messages.P2002 || 'A unique constraint violation occurred.';
        case 'P2025':
            return messages.P2025 || 'The record you are trying to find or update does not exist.';
        default:
            return messages.default || 'An unknown database error occurred.';
    }
}

function formatValidationError(error: BadRequestException, locale: LocaleType): string {
    const response = error.getResponse() as { message: string | string[] };
    const messages = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
    return `${translations[locale]?.success['validationError'] || 'Validation error'}: ${
        messages || ''
    }`;
}
