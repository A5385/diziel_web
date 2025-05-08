import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessTokenType } from 'src/types/tokens.type';

export const GetCurrentUser = createParamDecorator(
    (data: keyof AccessTokenType | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        // console.log(user);
        return data ? user?.[data] : user;
    },
);
