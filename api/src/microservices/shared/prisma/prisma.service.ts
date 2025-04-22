import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { FormatError } from 'src/helper/FormatError';
import { ContextType } from 'src/helper/handleRequest';
import { LoggerService } from '../logger/logger.service';

// const url = process.env.DATABASE_URL;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly logger: LoggerService) {
        super();
    }
    private readonly context: ContextType = 'prisma';

    async onModuleInit() {
        await this.connectWithRetry();
    }

    private async connectWithRetry() {
        const maxRetries = 5;
        let retries = 0;

        while (retries < maxRetries) {
            try {
                await this.$connect();
                this.logger.info({ context: this.context, message: 'Prisma client connected' });
                break; // Connection successful, exit the loop
            } catch (error) {
                if (error instanceof PrismaClientInitializationError) {
                    this.logger.error({
                        message: 'Error initializing Prisma client:',
                        context: this.context,
                        trace: FormatError((error as Error).stack),
                    });
                    retries++;
                    console.log(`Retrying connection... (Attempt ${retries}/${maxRetries})`);
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
                } else {
                    throw error; // Re-throw non-Prisma initialization errors
                }
            }
        }

        if (retries === maxRetries) {
            console.error('Failed to initialize Prisma client after max retries.');
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
