import { User } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { PFSProps } from '@/types/service';
import { UseGetTableResponseType } from '@/types/ui';
import {
    useMutationDelete,
    useMutationPost,
    useMutationUpdate,
} from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const UserKey = {
    GetAllUsers: 'GET_ALL_USERS',
    findByPhone: 'find_by_phone',
    findById: 'find_by_id',
};

export const CreateUser = () => {
    return useMutationPost<UserSchema>({
        endpoint: 'user/register',
        queryKey: [UserKey.GetAllUsers],
    });
};

export const ToggleBlockUser = () => {
    return useMutationUpdate<UserSchema>({
        endpoint: 'user/toggle-block',
        queryKey: [UserKey.GetAllUsers],
    });
};
export const FindUserByEmail = (email: string) => {
    return useQueryData<UserSchema>({
        queryKey: ['FIND_USER_BY_EMAIL'],
        endpoint: 'user/find-user-by-email',
        id: email,
        enabled: !!email,
    });
};

export const GetAllUsers = ({ queryParams }: { queryParams?: PFSProps }) =>
    useQueryData<UseGetTableResponseType<UserSchema>>({
        queryKey: [UserKey.GetAllUsers],
        endpoint: 'user/find-all',
        queryParams,
    });

export const DeleteUser = () =>
    useMutationDelete({
        endpoint: 'user/delete',
        queryKey: [UserKey.GetAllUsers],
    });
export const FindUserByPhone = (phone?: string) =>
    useQueryData<UserSchema>({
        endpoint: 'user/find-user-by-phone',
        queryKey: [UserKey.findByPhone],
        enabled: !!phone,
        id: phone,
    });
export const FindUserById = (id?: string) =>
    useQueryData<UserSchema>({
        endpoint: 'user/find-user-by-id',
        queryKey: [UserKey.findById],
        enabled: !!id,
        id,
    });

export const VerifyOtp = () => useMutationPost<User>({ endpoint: 'user/verify-otp', queryKey: [] });
export const SetPassword = () =>
    useMutationPost<User>({ endpoint: 'user/set-password', queryKey: [] });
