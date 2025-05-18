import { User, UserRole } from '@/types/prisma';
import axios from 'axios';
import { AxiosService } from '../axios-service/CRUD';
import { useMutationPost } from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

import { default as AppConfig, default as constants } from '@/constants/AppSettings';
const serverUrl = constants.api.serverUrl;
const apiKey = constants.api.apiKey;
export const AuthKey = {
    UserSession: 'USER_SESSION',
    UserAuthenticated: 'USER_AUTHENTICATED',
};
export const HandleLogin = () => useMutationPost<boolean>({ endpoint: 'auth/login', queryKey: [] });

export const CheckEmail = () =>
    useMutationPost<User>({ endpoint: 'auth/check-email', queryKey: [] });

export const CheckAuthentication = async () => {
    try {
        const res = await axios.get<boolean>(`${serverUrl}/auth/check-authentication`, {
            withCredentials: true,
            headers: {
                [AppConfig.keys.apiKey]: apiKey,
            },
        });
        return res?.data ?? false;
    } catch {
        return false;
    }
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
        retry: false,
    });
};

export const Logout = () => {
    return useMutationPost({ endpoint: 'auth/logout', queryKey: [] });
};
