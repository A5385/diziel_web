import { UserSchema } from '@/types/schema';

export const getUserName = (user: UserSchema | undefined) => user?.profile?.fullName;
