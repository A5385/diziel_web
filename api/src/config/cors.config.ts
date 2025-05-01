//api\src\config\cors.config.ts

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const Cors: CorsOptions = {
    origin: process.env.CORS_ORIGIN, // Corrected the trailing slash
    credentials: true,
    methods: process.env.CORS_METHODS,
    allowedHeaders: process.env.CORS_HEADERS,
};
