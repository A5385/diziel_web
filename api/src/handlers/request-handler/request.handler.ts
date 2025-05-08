import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { LoggerType } from 'src/app/shared/services/logger/type';
import { FormatError } from 'src/helper/FormatError';
import { localeHelper } from 'src/helper/locale-helper';
import { ApiResponseType, LocaleType, OperationType } from 'src/types/response';
import { mapStatusCode } from './status.code';
import { ContextType, HandleRequestProps } from './type';

export function generateResponse<T>({ ok, status, message, error, data }: ApiResponseType<T>) {
    return { ok, status, message, error: error ?? undefined, data: data ?? undefined };
}

type CommonType = {
    context: ContextType;
    i18n?: I18nService<Record<string, unknown>>;
    locale: LocaleType;
};

const transContext = ({ context, i18n, locale }: CommonType) =>
    localeHelper({ path: `context.${context}`, i18n, locale });

export async function RequestHandler<T, V extends OperationType>({
    fn,
    method,
    logger,
    context,
    locale = 'ar',
    i18n,
    ...loggerProps
}: HandleRequestProps<T, V>): Promise<ApiResponseType<T>> {
    const translatedContext = transContext({ context, i18n, locale });

    try {
        const result = await fn();

        logger.success<V>(method, {
            context,
            ...loggerProps,
        } as unknown as LoggerType<V>);

        return generateResponse({
            ok: true,
            status: mapStatusCode.success[method] || 200,
            data: result,
            message: i18n?.t(`index.success.${method}`, {
                lang: locale,
                args: { ...loggerProps, context: translatedContext },
            }),
        });
    } catch (error) {
        logger.error(method, {
            error,
            context,
            ...loggerProps,
        } as unknown as LoggerType<V> & { error: Error });

        return generateResponse({
            ok: false,
            status: mapStatusCode.error[method] || 500,
            error: {
                message: formatErrorMessage({ error, context, i18n, locale }),
                error: FormatError((error as Error).stack),
            },
            message: i18n?.t(`index.error.${method}`, {
                lang: locale,
                args: { ...loggerProps, context: translatedContext },
            }),
        });
    }
}

function formatErrorMessage({
    error,
    locale,
    context,
    i18n,
}: CommonType & { error: Error }): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return formatPrismaError({ error, i18n, context, locale });
    }

    if (error instanceof BadRequestException) {
        return formatValidationError({ error, locale, i18n });
    }

    return i18n?.t('index.error.unexpected', { lang: locale }) || 'An unexpected error occurred.';
}

function formatPrismaError({
    error,
    locale,
    context,
    i18n,
}: CommonType & { error: Prisma.PrismaClientKnownRequestError }): string {
    const translatedContext = transContext({ context, i18n, locale });

    switch (error.code) {
        case 'P2002':
        case 'P2025':
            return (
                i18n?.t(`index.prismaErrors.${error.code}`, {
                    lang: locale,
                    args: { context: translatedContext },
                }) ?? error.message
            );
        default:
            return (
                i18n?.t('index.prismaErrors.default', {
                    lang: locale,
                    args: { context: translatedContext },
                }) ?? error.message
            );
    }
}

function formatValidationError({
    error,
    locale,
    i18n,
}: Omit<CommonType, 'context'> & { error: BadRequestException }): string {
    const response = error.getResponse() as { message: string | string[] };
    const messages = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;

    const baseMsg = i18n?.t('index.error.validationError', { lang: locale }) ?? 'Validation failed';
    return `${baseMsg}: ${messages}`;
}
