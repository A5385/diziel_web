import { User } from '@/types/client';
import { UserSchema } from '@/types/schema';
import { useMutationPost } from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const UserKey = {
    findByEmail: 'find_by_email',
    findById: 'find_by_id',
};
export const FindUserByEmail = (email?: string) =>
    useQueryData<UserSchema>({
        endpoint: 'user/find-user-by-email',
        queryKey: [UserKey.findByEmail],
        enabled: !!email,
        id: email,
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
