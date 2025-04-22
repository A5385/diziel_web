import { Injectable } from '@nestjs/common';
import { FormatError } from 'src/helper/FormatError';
import { replacePlaceholders } from 'src/helper/handleRequest';
import { translations } from 'src/helper/translations';
import { logger } from './winston.config';

type OperationType = keyof LoggerTypeMap; // Ensure OperationType matches the keys of LoggerTypeMap

type LoggerTypeMap = {
    create: { name: string; context: string };
    update: { id: string | number; context: string };
    delete: { id: string | number; context: string };
    findById: { id: string | number; context: string };
    findBy: { by: string; context: string };
    findAll: { context: string };
    sendEmail: {
        type: 'Confirmation' | 'Activation';
        to: string;
        object?: string;
        context: string;
    };
    assign: {
        assigner: string;
        assignerId: string | number;
        assignTo: string;
        assignToId: string | number;
        context: string;
    };
    saveFile: { fileName?: string; filePath: string; context: string };
    deleteFile: { fileName?: string; filePath: string; context: string };
    makePayment: { amount: number; payer: string; payee: string; context: string };
};

// Fix: Constrain T to valid keys of LoggerTypeMap
type LoggerType<T extends keyof LoggerTypeMap> = LoggerTypeMap[T];

@Injectable()
export class LoggerService {
    private translate(type: 'success' | 'error', messageKey: OperationType): string {
        return translations.en[type][messageKey] || messageKey;
    }

    // Base logger methods
    log<T extends OperationType>(payload: LoggerType<T> & { message: string; data?: any }) {
        logger.log({
            level: 'LOG',
            message: payload.message,
            data: payload.data,
            context: payload.context,
        });
    }

    info<T extends OperationType>(payload: LoggerType<T> & { message: string; data?: any }) {
        logger.info({
            level: 'INFO',
            message: payload.message,
            data: payload.data,
            context: payload.context,
        });
    }

    error<T extends OperationType>(
        payload: LoggerType<T> & { message: string; trace?: string | string[] },
    ) {
        logger.error({
            level: 'ERROR',
            message: JSON.stringify(payload.message, null, 2),
            context: payload.context,
            trace: payload.trace,
        });
    }

    warn<T extends OperationType>(payload: LoggerType<T> & { message: string; data?: any }) {
        logger.warn({
            level: 'WARN',
            message: payload.message,
            data: payload.data,
            context: payload.context,
        });
    }

    debug<T extends OperationType>(payload: LoggerType<T> & { message: string; data?: any }) {
        logger.debug({
            level: 'DEBUG',
            message: payload.message,
            data: payload.data,
            context: payload.context,
        });
    }

    // Specific operations
    create({ name, context }: LoggerType<'create'>) {
        const message = replacePlaceholders(this.translate('success', 'create'), { name, context });
        this.info({ message, context });
    }

    errorCreate({ context, error }: { context: string; error: any }) {
        const message = replacePlaceholders(this.translate('error', 'create'), { context });
        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    update({ id, context }: LoggerType<'update'>) {
        const message = replacePlaceholders(this.translate('success', 'update'), {
            id: id?.toString(),
            context,
        });
        this.info({ message, context });
    }

    errorUpdate({ id, context, error }: { id: string | number; context: string; error: any }) {
        const message = replacePlaceholders(this.translate('error', 'update'), {
            id: id?.toString(),
            context,
        });
        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    findById({ id, context }: LoggerType<'findById'>) {
        const message = replacePlaceholders(this.translate('success', 'findById'), {
            id: id?.toString(),
            context,
        });
        this.info({ message, context });
    }

    errorFindById({ id, context, error }: { id: string | number; context: string; error: any }) {
        const message = replacePlaceholders(this.translate('error', 'findById'), {
            id: id?.toString(),
            context,
        });
        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    findAll({ context }: LoggerType<'findAll'>) {
        const message = replacePlaceholders(this.translate('success', 'findAll'), { context });
        this.info({ message, context });
    }

    errorFindAll({ context, error }: { context: string; error: any }) {
        const message = replacePlaceholders(this.translate('success', 'findAll'), { context });
        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    delete({ id, context }: LoggerType<'delete'>) {
        const message = replacePlaceholders(this.translate('success', 'delete'), {
            id: id?.toString(),
            context,
        });
        this.info({ message, context });
    }

    errorDelete({ id, context, error }: { id: string | number; context: string; error: any }) {
        const message = replacePlaceholders(this.translate('success', 'delete'), {
            id: id?.toString(),
            context,
        });
        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    sendEmail({ type, to, object, context }: LoggerType<'sendEmail'>) {
        const message = replacePlaceholders(this.translate('success', 'sendEmail'), {
            type,
            to,
            object,
            context,
        });

        this.info({ message, context });
    }

    errorSendEmail({
        type,
        to,
        object,
        context,
        error,
    }: LoggerType<'sendEmail'> & { error: Error }) {
        const message = replacePlaceholders(this.translate('error', 'sendEmail'), {
            type,
            to,
            object,
            context,
        });

        this.error({
            message,
            context,
            trace: FormatError(error.stack),
        });
    }

    assign({ assigner, assignerId, assignTo, assignToId, context }: LoggerType<'assign'>) {
        const message = replacePlaceholders(this.translate('success', 'assign'), {
            assigner,
            assignerId: assignerId?.toString(),
            assignTo,
            assignToId: assignToId?.toString(),
            context,
        });

        this.info({ message, context });
    }

    errorAssign({
        assigner,
        assignerId,
        assignTo,
        assignToId,
        context,
        error,
    }: LoggerType<'assign'> & { error: any }) {
        const message = replacePlaceholders(this.translate('success', 'assign'), {
            assigner,
            assignerId: assignerId?.toString(),
            assignTo,
            assignToId: assignToId?.toString(),
            context,
        });

        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    makePayment({ amount, payer, payee, context }: LoggerType<'makePayment'>) {
        const message = replacePlaceholders(this.translate('success', 'makePayment'), {
            amount: amount?.toString(),
            payer,
            payee,
            context,
        });

        this.info({ message, context });
    }

    errorMakePayment({
        amount,
        payer,
        payee,
        context,
        error,
    }: LoggerType<'makePayment'> & { error: any }) {
        const message = replacePlaceholders(this.translate('success', 'makePayment'), {
            amount: amount?.toString(),
            payer,
            payee,
            context,
        });

        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    saveFile({ fileName, filePath, context }: LoggerType<'saveFile'>) {
        const fileDescription = fileName ? `file ${fileName}` : 'a file';
        const message = replacePlaceholders(this.translate('success', 'saveFile'), {
            fileDescription,
            filePath,
            context,
        });

        this.info({ message, context });
    }

    errorSaveFile({ fileName, filePath, context, error }: LoggerType<'saveFile'> & { error: any }) {
        const fileDescription = fileName ? `file ${fileName}` : 'a file';
        const message = replacePlaceholders(this.translate('success', 'saveFile'), {
            fileDescription,
            filePath,
            context,
        });

        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    deleteFile({ fileName, filePath, context }: LoggerType<'deleteFile'>) {
        const fileDescription = fileName ? `file ${fileName}` : 'a file';
        const message = replacePlaceholders(this.translate('success', 'deleteFile'), {
            fileDescription,
            filePath,
            context,
        });

        this.info({ message, context });
    }

    errorDeleteFile({
        fileName,
        filePath,
        context,
        error,
    }: LoggerType<'deleteFile'> & { error: any }) {
        const fileDescription = fileName ? `file ${fileName}` : 'a file';
        const message = replacePlaceholders(this.translate('success', 'deleteFile'), {
            fileDescription,
            filePath,
            context,
        });

        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }

    findBy({ by, context, key }: LoggerType<'findBy'> & { key?: string }) {
        const message = replacePlaceholders(this.translate('success', 'findBy'), {
            by,
            key,
            context,
        });

        this.info({ message, context });
    }

    errorFindBy({
        id,
        by,
        context,
        error,
    }: {
        id: string | number;
        by: string;
        context: string;
        error: any;
    }) {
        const message = replacePlaceholders(this.translate('error', 'findBy'), {
            id: id?.toString(),
            by,
            context,
        });

        this.error({
            message,
            context,
            trace: FormatError((error as Error).stack),
        });
    }
}
