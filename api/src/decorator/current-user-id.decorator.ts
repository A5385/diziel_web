import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Request } from 'express';

interface CustomRequest extends Request {
    user?: { id: string; sub: string; email: string; role: UserRole };
}

export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): string => {
        const request: CustomRequest = context.switchToHttp().getRequest();
        const user = request?.user;
        // console.log('🚀 >  file: current-user-id.decorator.ts:11 >  user:', user);
        return (user?.id ?? '') || (user?.sub ?? '');
    },
);
