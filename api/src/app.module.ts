import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { WinstonModule } from 'nest-winston';
import { I18nModule } from 'nestjs-i18n';
import { AgencyAgentModule } from './app/services/agency-agent/agency-agent.module';
import { AgencyModule } from './app/services/agency/agency.module';
import { CarModule } from './app/services/car/car.module';
import { ComplaintModule } from './app/services/complaint/complaint.module';
import { CountsModule } from './app/services/counts/counts.module';
import { DriverModule } from './app/services/driver/driver.module';
import { EmployeeModule } from './app/services/employee/employee.module';
import { RequestModule } from './app/services/request/request.module';
import { TrailerModule } from './app/services/trailer/trailer.module';
import { AuthGuard } from './app/services/user/auth/auth.guard';
import { AuthModule } from './app/services/user/auth/auth.module';
import { ProfileModule } from './app/services/user/profile/profile.module';
import { UserModule } from './app/services/user/user/user.module';
import { EnvConfigService } from './app/shared/services/env-config.service';
import { SharedModule } from './app/shared/shared.module';
import { localeConfig, WinstonConfig } from './config';
import { ConfigModuleOption } from './config/config.config';

@Module({
    imports: [
        WinstonModule.forRoot(WinstonConfig),
        ConfigModule.forRoot(ConfigModuleOption),
        I18nModule.forRootAsync(localeConfig),
        JwtModule.register({}),
        UserModule,
        AuthModule,
        SharedModule,
        ProfileModule,
        DriverModule,
        AgencyModule,
        AgencyAgentModule,
        EmployeeModule,
        CarModule,
        TrailerModule,
        RequestModule,
        ComplaintModule,
        CountsModule,
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
