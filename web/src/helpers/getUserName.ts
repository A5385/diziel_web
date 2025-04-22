import { UserSchema } from '@/types/schema';

export const getUserName = (user: UserSchema) =>
    user?.profile?.firstName + ' ' + user?.profile?.lastName;
