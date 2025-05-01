import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { join } from 'path';

export const MailConfig: MailerAsyncOptions = {
    useFactory: () => ({
        transport: {
            host: process.env.MAIL_HOST || 'domain.com',
            port: Number(process.env.MAIL_PORT) || 465,
            secure: (process.env.MAIL_SECURE || 'true') === 'true',
            auth: {
                user: process.env.MAIL_USER || 'user',
                pass: process.env.MAIL_PASSWORD || 'password',
            },
            pool: false,
        },
        defaults: {
            from: process.env.MAIL_FROM || '',
        },
        template: {
            dir: join(__dirname, '..', 'mail', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    }),
};
