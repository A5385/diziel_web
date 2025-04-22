import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';

import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigService } from '../env-config/env-config.service';
import { MailService } from './mail.service';

@Global() // 👈 global module
@Module({
    imports: [
        EnvConfigModule,
        MailerModule.forRootAsync({
            useFactory: (envConfig: EnvConfigService) => ({
                transport: {
                    host: envConfig.getMailHost(),
                    port: envConfig.getMailPort(),
                    secure: envConfig.getMailSecure(),
                    auth: {
                        user: envConfig.getMailUser(),
                        pass: envConfig.getMailPassword(),
                    },
                },
                defaults: {
                    from: envConfig.getMailFrom(),
                },
                template: {
                    dir: join(__dirname, '..', 'mail', 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [EnvConfigService],
        }),
    ],
    providers: [MailService, EnvConfigService],
    exports: [MailService],
})
export class MailModule {}
