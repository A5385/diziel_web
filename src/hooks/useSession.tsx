'use client';
import { TokenService } from '@/helpers/local-storage-service';
import { UserRole } from '@/types/client';
import { jwtDecode } from 'jwt-decode';

type UserSession = {
    id: string;
    email: string;
    role: UserRole;
    deliveryId?: string;
    restaurantId?: string;
};
const useSession = () => {
    const token = TokenService.accessToken.get();
    // console.log('🚀 >  useSession >  token:', token);

    if (token) {
        const decoded = jwtDecode<UserSession>(token);
        // console.log('🚀 >  useSession >  decoded:', decoded);

        return decoded;
    }
};

export default useSession;
