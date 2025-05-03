import { ContextType } from 'src/handlers/request-handler/type';
import { OperationType } from 'src/types/response';

export type NotificationType = 'Confirmation' | 'Activation' | 'notification';
type CommonLoggerProps = { context: ContextType };

export type LoggerTypeMap = {
    create: CommonLoggerProps;
    update: CommonLoggerProps & { id: string | number };
    delete: CommonLoggerProps & { id: string | number };
    findById: CommonLoggerProps & { id: string | number };
    findBy: CommonLoggerProps & { key: string; value: string };
    findAll: CommonLoggerProps;
    sendEmail: CommonLoggerProps & {
        type: NotificationType;
        email: string;
    };
    sendSMS: CommonLoggerProps & {
        type: NotificationType;
        phone: string;
    };
    assign: CommonLoggerProps & {
        assigner: string;
        assignerId: string | number;
        assignTo: string;
        assignToId: string | number;
    };
    saveFile: CommonLoggerProps & { fileName?: string; filePath: string };
    deleteFile: CommonLoggerProps & { fileName?: string; filePath: string };
    makePayment: CommonLoggerProps & { amount: number; payer: string; payee: string };
    'db-connect': CommonLoggerProps;
    token: CommonLoggerProps & { token: 'access' | 'refresh' };
    'verify-phone': CommonLoggerProps & { phone: string };
    'verify-otp': CommonLoggerProps & { phone: string };
    'set-password': CommonLoggerProps & { phone: string };
};

export type LoggerType<T extends OperationType> = T extends 'create'
    ? LoggerTypeMap['create']
    : T extends 'update'
      ? LoggerTypeMap['update']
      : T extends 'delete'
        ? LoggerTypeMap['delete']
        : T extends 'findById'
          ? LoggerTypeMap['findById']
          : T extends 'findBy'
            ? LoggerTypeMap['findBy']
            : T extends 'findAll'
              ? LoggerTypeMap['findAll']
              : T extends 'sendEmail'
                ? LoggerTypeMap['sendEmail']
                : T extends 'assign'
                  ? LoggerTypeMap['assign']
                  : T extends 'saveFile'
                    ? LoggerTypeMap['saveFile']
                    : T extends 'deleteFile'
                      ? LoggerTypeMap['deleteFile']
                      : T extends 'makePayment'
                        ? LoggerTypeMap['makePayment']
                        : T extends 'sendSMS'
                          ? LoggerTypeMap['sendSMS']
                          : T extends 'db-connect'
                            ? LoggerTypeMap['db-connect']
                            : T extends 'token'
                              ? LoggerTypeMap['token']
                              : T extends 'verify-phone'
                                ? LoggerTypeMap['verify-phone']
                                : T extends 'verify-otp'
                                  ? LoggerTypeMap['verify-otp']
                                  : T extends 'set-password'
                                    ? LoggerTypeMap['set-password']
                                    : never;
