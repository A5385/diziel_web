import { Logger } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

export const slateRounds = 12;

export async function hashPassword(password: string): Promise<string | undefined> {
    try {
        return await hash(password, slateRounds);
    } catch (error) {
        Logger.error((error as Error).message);
    }
}

export async function comparePassword(hashedPassword: string, password: string): Promise<boolean> {
    try {
        return await compare(password, hashedPassword);
    } catch (error) {
        Logger.error((error as Error).message);
        return false;
    }
}
