import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { ContextType } from 'src/handlers/request-handler/type';
import { LoggerService } from './logger/logger.service';

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
                this.logger.success('db-connect', {
                    context: this.context,
                });
                break; // Connection successful, exit the loop
            } catch (error) {
                if (error instanceof PrismaClientInitializationError) {
                    this.logger.error('db-connect', {
                        context: this.context,
                        error: error as Error,
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
