import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { LocaleType } from 'src/types/response';

export const localeKey = 'NEXT_LOCALE';

export const GetLocale = createParamDecorator(
    (_: undefined, context: ExecutionContext): LocaleType => {
        const request: Request = context.switchToHttp().getRequest();
        return request.cookies[localeKey] || 'en';
    },
);
