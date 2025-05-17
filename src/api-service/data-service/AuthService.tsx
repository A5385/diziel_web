import { User, UserRole } from '@/types/prisma';
import { AxiosService } from '../axios-service/CRUD';
import { useMutationPost } from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const AuthKey = {
    UserSession: 'USER_SESSION',
    UserAuthenticated: 'USER_AUTHENTICATED',
};
export const HandleLogin = () => useMutationPost<boolean>({ endpoint: 'auth/login', queryKey: [] });

export const CheckEmail = () =>
    useMutationPost<User>({ endpoint: 'auth/check-email', queryKey: [] });

export const CheckAuthentication = async () => {
    const res = await AxiosService.get<boolean>({ endpoint: 'auth/check-authentication' });
    console.log('🚀 >  CheckAuthentication >  res:', res);
    return res;
};

export type UserSessionResponse = {
    employeeId?: string | undefined;
    agentId?: string | undefined;
    agencyId?: string | undefined;
    driverId?: string | undefined;
    id: string;
    role: UserRole | undefined;
    phone: string;
    blocked: boolean;
    verified: boolean | Date;
    fullName: string;
    nickname: string;
    profileId: string;
};

export const GetUserSession = async () => {
    const res = await AxiosService.get<UserSessionResponse>({ endpoint: 'auth/get-user-session' });
    console.log('🚀 >  GetUserSession >  res:', res);

    return res;
};

export const useSession = () => {
    return useQueryData<UserSessionResponse>({
        endpoint: 'auth/get-user-session',
        queryKey: [AuthKey.UserSession],
    });
};
export const UserAuthenticated = () => {
    return useQueryData<boolean>({
        endpoint: 'auth/check-authentication',
        queryKey: [AuthKey.UserAuthenticated],
    });
};

export const Logout = () => {
    return useMutationPost({ endpoint: 'auth/logout', queryKey: [] });
};
