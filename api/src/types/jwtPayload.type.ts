import { UserRole } from '@prisma/client';

export type JwtPayload = {
    email: string;
    sub: string;
    role: UserRole;
    id: string;
    entityId: string;
    profileId: string;
};
