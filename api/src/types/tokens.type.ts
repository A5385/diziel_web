import { UserRole } from '@prisma/client';

export type Tokens = {
    access_token: string;
    refresh_token: string;
};

export type AccessTokenType = {
    id: string;
    phone: string;
    role: UserRole;
};

export type RefreshTokenType = {
    id: string;
};
