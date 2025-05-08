// logger.service.ts
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ContextType } from 'src/handlers/request-handler/type';
import { FormatError } from 'src/helper/FormatError';
import { OperationType } from 'src/types/response';
import { LoggerType } from './type';
import { logger } from './winston.config';

@Injectable()
export class LoggerService {
    constructor(private readonly i18n: I18nService) {}

    private translate<T extends OperationType>(
        category: 'success' | 'error',
        key: T,
        args: Record<string, any>,
    ): string {
        return this.i18n.t(`index.${category}.${key}`, { lang: 'en', args });
    }

    private baseLog(
        level: 'LOG' | 'INFO' | 'ERROR' | 'WARN' | 'DEBUG',
        payload: {
            message: string;
            context: ContextType;
            data?: any;
            trace?: string | string[];
        },
    ) {
        logger[level.toLowerCase()]({
            level,
            message: payload.message,
            context: payload.context,
            data: payload.data,
            trace: payload.trace,
        });
    }

    success<T extends OperationType>(type: T, payload: LoggerType<T>) {
        const message = this.translate('success', type, { ...payload });
        this.baseLog('INFO', {
            message,
            context: payload.context,
            data: payload,
        });
    }

    error<T extends OperationType>(type: T, payload: LoggerType<T> & { error: Error }) {
        const message = this.translate('error', type, { ...payload });
        this.baseLog('ERROR', {
            message,
            context: payload.context,
            trace: FormatError(payload?.error?.stack),
        });
    }

    warn<T extends OperationType>(type: T, payload: LoggerType<T>) {
        const message = this.translate('success', type, { ...payload });
        this.baseLog('WARN', {
            message,
            context: payload.context,
            data: payload,
        });
    }

    debug<T extends OperationType>(type: T, payload: LoggerType<T>) {
        const message = this.translate('success', type, { ...payload });
        this.baseLog('DEBUG', {
            message,
            context: payload.context,
            data: payload,
        });
    }

    log<T extends OperationType>(type: T, payload: LoggerType<T>) {
        const message = this.translate('success', type, { ...payload });
        this.baseLog('LOG', {
            message,
            context: payload.context,
            data: payload,
        });
    }
}
