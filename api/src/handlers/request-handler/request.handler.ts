import { LoggerType } from 'src/app/shared/services/logger/type';
import { ApiResponseType, OperationType } from 'src/types/response';
import { mapStatusCode } from './status.code';
import { HandleRequestProps } from './type';

export function generateResponse<T>({ ok, status, message, error, data }: ApiResponseType<T>) {
    return { ok, status, message, error: error ?? undefined, data: data ?? undefined };
}

export async function RequestHandler<T, V extends OperationType>({
    fn,
    method,
    logger,
    context,
    locale = 'ar',
    i18n,
    ...loggerProps
}: HandleRequestProps<T, V>): Promise<ApiResponseType<T>> {
    const trasContext = i18n?.t(`index.context.${context}`, {
        lang: locale,
    });
    try {
        const result = await fn();

        const payload = {
            context,
            ...loggerProps,
        };
        logger.success<V>(method, payload as unknown as LoggerType<V>);

        const message: string = i18n
            ? i18n.t(`index.success.${method}`, {
                  lang: locale,
                  args: { ...loggerProps, context: trasContext },
              })
            : `Success: ${method}`;

        return generateResponse({
            ok: true,
            status: mapStatusCode.success[method] || 200,
            data: result,
            message,
        });
    } catch (err) {
        const error = err as Error;
        logger.error(method, { error, context, ...loggerProps } as unknown as LoggerType<V> & {
            error: Error;
        });

        const message: string = i18n
            ? i18n.t(`index.success.${method}`, {
                  args: { ...loggerProps, context: trasContext },
                  lang: locale,
              })
            : `Success: ${method}`;

        return generateResponse({
            ok: false,
            status: mapStatusCode.error[method] || 500,
            error: {
                message: error.message,
                error: JSON.stringify(error, null, 2),
            },
            message,
        });
    }
}

// function formatErrorMessage(error: Error, locale: LocaleType): string {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//         return formatPrismaError(error, locale);
//     }
//     if (error instanceof BadRequestException) {
//         return formatValidationError(error, locale);
//     }
//     return translations[locale]?.success['error'] || 'An unexpected error occurred.';
// }

// function formatPrismaError(
//     error: Prisma.PrismaClientKnownRequestError,
//     locale?: LocaleType,
// ): string {
//     const messages = translations[locale ?? 'en']?.prismaErrors;
//     switch (error.code) {
//         case 'P2002':
//             return messages.P2002 || 'A unique constraint violation occurred.';
//         case 'P2025':
//             return messages.P2025 || 'The record you are trying to find or update does not exist.';
//         default:
//             return messages.default || 'An unknown database error occurred.';
//     }
// }

// function formatValidationError(error: BadRequestException, locale: LocaleType): string {
//     const response = error.getResponse() as { message: string | string[] };
//     const messages = Array.isArray(response.message)
//         ? response.message.join(', ')
//         : response.message;
//     return `${translations[locale]?.success['validationError'] || 'Validation error'}: ${
//         messages || ''
//     }`;
// }
