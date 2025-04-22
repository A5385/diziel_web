import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigService } from 'src/microservices/shared/env-config/env-config.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RTGuard } from './rt.guard';

@Module({
    imports: [JwtModule.register({})],
    providers: [AuthService, EnvConfigService, AuthGuard, RTGuard],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard, RTGuard],
})
export class AuthModule {}
