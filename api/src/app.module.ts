import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { AuthGuard } from './microservices/services/user-and-auth/auth/auth.guard';
import { AuthModule } from './microservices/services/user-and-auth/auth/auth.module';
import { UserModule } from './microservices/services/user-and-auth/user/user.module';
import { EnvConfigService } from './microservices/shared/env-config/env-config.service';
import { LoggerModule } from './microservices/shared/logger/logger.module';
import { MailModule } from './microservices/shared/mail/mail.module';
import { PrismaModule } from './microservices/shared/prisma/prisma.module';

@Module({
    imports: [
        /// shared modules
        WinstonModule.forRoot(winstonConfig),
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        LoggerModule,
        JwtModule,
        MailModule,
        /// app modules
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },

        EnvConfigService,
    ],
})
export class AppModule {}
