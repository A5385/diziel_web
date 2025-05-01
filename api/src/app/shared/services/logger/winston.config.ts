import { format } from 'date-fns';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { AppConfig } from 'src/config/app.config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

type InfoType = {
    timestamp: string;
    level: string;
    message: string;
    context?: string;
    trace?: string;
};

const formatMsg = ({ timestamp, level, message, context, trace }: InfoType) => {
    const contextLength = context?.length ?? 0;
    const maxContextLength = 11 + 1;
    const spaces = contextLength < maxContextLength ? maxContextLength - contextLength : 0;

    return `${context?.toUpperCase() ?? 'N/A'}${' '.repeat(spaces)}  |  ${level}  |  ${format(timestamp, 'dd/MM/yyyy')}  |  ${format(timestamp, 'hh:mm:ss')}  |  ${message}${trace ? `\n${trace}` : ''}`;
};

const formatPrintF = winston.format.printf((info: InfoType) => formatMsg(info));

const winstonConsole = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        nestWinstonModuleUtilities.format.nestLike(AppConfig.name, {
            colors: true,
            prettyPrint: true,
        }),
        formatPrintF,
    ),
});

const winstonTransports = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});

export const logger = winston.createLogger({
    level: AppConfig.production ? 'info' : 'debug',
    format: winston.format.combine(winston.format.timestamp(), formatPrintF),
    transports: [winstonConsole, winstonTransports],
});
