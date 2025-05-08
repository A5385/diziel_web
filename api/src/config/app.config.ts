// api\src\config\app.config.ts
import * as dotenv from 'dotenv';

dotenv.config();
type ImageFolderType =
    | 'profileImage'
    | 'nationalId'
    | 'criminalRecord'
    | 'driverLicense'
    | 'drugTest'
    | 'visaImage'
    | 'driverPassport';

type AppConfigType = {
    production: boolean;
    name: string;
    port: number;
    host: string;
    prefix: string;
    authMethod: 'mobile' | 'email' | 'both' | 'none';
    databaseUrl: string;
    uploadFolder: string;
    imageFolder: Record<ImageFolderType, string>;
};

export const AppConfig: AppConfigType = {
    production: process.env.NODE_ENV === 'production',
    name: process.env.APP_NAME || 'API',
    port: Number(process.env.SERVER_PORT) || 3000,
    host: process.env.SERVER_HOST || 'domain.com',
    prefix: process.env.SERVER_PREFIX || 'api',
    authMethod: 'mobile',
    databaseUrl: process.env.DATABASE_URL || '',
    uploadFolder: 'uploads',
    imageFolder: {
        profileImage: 'profile-image',
        nationalId: 'national-identity',
        criminalRecord: 'criminal-record',
        driverLicense: 'driver-license',
        drugTest: 'drug-test',
        visaImage: 'visa-image',
        driverPassport: 'driver-passport',
    },
};

export const serverUrl = `${AppConfig.host}:${AppConfig.port}/${AppConfig.prefix}`;
