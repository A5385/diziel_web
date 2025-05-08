import { I18nService } from 'nestjs-i18n';
import { LoggerService } from 'src/app/shared/services';
import { LoggerType } from 'src/app/shared/services/logger/type';
import { LocaleType, OperationType } from 'src/types/response';
import { Context } from './context';

export type ContextType = keyof typeof Context;

export type HandleRequestProps<T, V extends OperationType> = LoggerType<V> & {
    fn: () => Promise<T>;
    method: V;
    logger: LoggerService;
    locale?: LocaleType;
    i18n: I18nService<Record<string, unknown>>;
};
