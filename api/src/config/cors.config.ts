//api\src\config\cors.config.ts

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';
dotenv.config();

// const origin = process.env.CORS_ORIGIN;
// // console.log('🚀 >  origin:', origin);
// const methods = process.env.CORS_METHODS;
// // console.log('🚀 >  methods:', methods);
// const allowedHeaders = process.env.CORS_HEADERS;
// console.log('🚀 >  allowedHeaders:', allowedHeaders);

const CORS_ORIGIN = ['http://localhost:7073'];
const CORS_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE', 'OPTIONS'];
const CORS_HEADERS = [
    'Accept',
    'Authorization',
    'Content-Type',
    'X-Requested-With',
    'X-From-Mobile-App',
    'api_key',
    'x-api-key',
];

export const Cors: CorsOptions = {
    origin: CORS_ORIGIN, // Corrected the trailing slash
    credentials: true,
    methods: CORS_METHODS,
    allowedHeaders: CORS_HEADERS,
};
