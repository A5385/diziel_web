// api\src\config\app.config.ts
import * as dotenv from 'dotenv';

dotenv.config();
type AppConfigType = {
    production: boolean;
    name: string;
    port: number;
    host: string;
    prefix: string;
    authMethod: 'mobile' | 'email' | 'both' | 'none';
    databaseUrl: string;
};

export const AppConfig: AppConfigType = {
    production: process.env.NODE_ENV === 'production',
    name: process.env.APP_NAME || 'API',
    port: Number(process.env.SERVER_PORT) || 3000,
    host: process.env.SERVER_HOST || 'domain.com',
    prefix: process.env.SERVER_PREFIX || 'api',
    authMethod: 'mobile',
    databaseUrl: process.env.DATABASE_URL || '',
};

export const serverUrl = `${AppConfig.host}:${AppConfig.port}/${AppConfig.prefix}`;
