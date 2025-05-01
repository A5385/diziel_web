import { Injectable, ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { CookieOptions } from 'express';
import { join } from 'path';

@Injectable()
export class EnvConfigService {
    constructor(private readonly configService: ConfigService) {}

    isInProduction(): boolean {
        return Boolean(this.configService.get<string>('NODE_ENV') === 'production');
    }

    getJwtSecret(): string {
        return this.configService.get<string>('JWT_SECRET') ?? '';
    }
    getApiKey(): string {
        return this.configService.get<string>('API_KEY') ?? '';
    }

    getAccessTokenSecret(): string {
        return this.configService.get<string>('ACCESS_TOKEN_SECRET') ?? '';
    }

    getAccessTokenExpTime(): number | string {
        // d * h * m * s * ms
        return 1 * 60 * 1000;
    }

    getRefreshTokenSecret(): string {
        return this.configService.get<string>('REFRESH_TOKEN_SECRET') ?? '';
    }

    getRefreshTokenExpTime(): number | string {
        // return 7 * 24 * 60 * 60 * 1000;
        return '7d';
    }

    getMailHost(): string {
        return this.configService.get<string>('MAIL_HOST') ?? '';
    }

    getMailPort(): number {
        return this.configService.get<number>('MAIL_PORT') ?? 0;
    }

    getMailSecure(): boolean {
        return this.configService.get<boolean>('MAIL_SECURE') ?? false;
    }

    getMailUser(): string {
        return this.configService.get<string>('MAIL_USER') ?? '';
    }

    getMailPassword(): string {
        return this.configService.get<string>('MAIL_PASSWORD') ?? '';
    }

    getMailFrom(): string {
        return this.configService.get<string>('MAIL_FROM') ?? '';
    }
    cookiesOptions(): CookieOptions {
        // console.log('production mode :', this.isInProduction());
        const secure = this.isInProduction();

        return {
            httpOnly: true,
            secure,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        };
    }

    globalPipesOptions(): ValidationPipeOptions {
        return {
            whitelist: true,
            transform: true,
            enableDebugMessages: true,
        };
    }

    serverStaticConfig(): ServeStaticModuleAsyncOptions {
        return {
            useFactory: () => {
                const uploadPath = join(__dirname, '..', '..', 'uploads');
                return [
                    {
                        rootPath: uploadPath,
                        serveRoot: '/uploads',
                    },
                ];
            },
        };
    }
}
