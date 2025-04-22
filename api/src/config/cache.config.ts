// import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
// import { Logger } from '@nestjs/common';
// import { memoryStore } from 'cache-manager'; // In-memory cache fallback
// import { redisStore } from 'cache-manager-redis-yet'; // Redis store
// import * as dotenv from 'dotenv';

// dotenv.config();

// const logger = new Logger('CacheConfig');

// export const cacheConfig: CacheModuleAsyncOptions = {
//     isGlobal: true,
//     useFactory: async () => {
//         try {
//             const store = await redisStore({
//                 socket: {
//                     host: process.env.REDIS_HOST || '127.0.0.1',
//                     port: parseInt(process.env.REDIS_PORT || '6379', 10),
//                     reconnectStrategy: (retries) => {
//                         logger.warn(`Redis reconnect attempt #${retries}`);
//                         return Math.min(retries * 50, 2000); // Retry delay
//                     },
//                     timeout: parseInt(process.env.REDIS_TIMEOUT || '20000', 10),
//                 },
//                 ttl: parseInt(process.env.REDIS_TTL || '5000', 10), // Time-to-live
//             });

//             logger.log('Redis connection established successfully');
//             return {
//                 store,
//             };
//         } catch (error) {
//             logger.error(
//                 'Could not establish Redis connection, falling back to in-memory cache',
//                 error,
//             );

//             // Fallback to in-memory cache
//             return {
//                 store: memoryStore(),
//                 ttl: parseInt(process.env.IN_MEMORY_TTL || '5000', 10),
//             };
//         }
//     },
// };
