import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
export const corsOption: CorsOptions = {
    origin: ['http://localhost:7072', 'https://finpilot.ebtkar.net'], // Corrected the trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Accept',
        'Authorization',
        'Content-Type',
        'X-Requested-With',
        'X-From-Mobile-App',
        'api_key',
        'x-api-key',
    ],
};
