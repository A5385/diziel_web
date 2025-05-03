import { User, UserRole } from '@/types/prisma';
import { useMutationPost } from '../react-query-service/mutate-service';

export const HandleLogin = () =>
    useMutationPost<{
        accessToken: string;
        refreshToken: string;
        id: string;
        phone: string;
        role: UserRole;
        blocked: boolean;
        verified: Date | null;
        entityId: string | undefined;
        profileId: string | undefined;
        lastLogin: Date | null;
    }>({ endpoint: 'auth/login', queryKey: [] });

export const CheckEmail = () =>
    useMutationPost<User>({ endpoint: 'auth/check-email', queryKey: [] });
