import { User } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { PFSProps } from '@/types/service';
import { UseGetTableResponseType } from '@/types/ui';
import { useMutationDelete, useMutationPost } from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const UserKey = {
    GetAllUsers: 'GET_ALL_USERS',
    findByPhone: 'find_by_phone',
    findById: 'find_by_id',
};

export type RegisterUserResponse = {
    id: string;
    phone: string;
    profileId: string | undefined;
    nationalId: string | undefined;
    nationalIdNumber: string | undefined;
};
export const RegisterNewUser = () => {
    return useMutationPost<RegisterUserResponse>({
        endpoint: 'user/register',
        queryKey: [UserKey.GetAllUsers],
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
export const FindUserByPhone = (phone: string | null) => {
    useQueryData<UserSchema>({
        endpoint: 'user/find-user-by-phone',
        queryKey: [UserKey.findByPhone],
        enabled: !!phone,
        id: phone,
    });
};
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
