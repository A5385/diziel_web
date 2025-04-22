// local-storage-service.ts
import constants from '@/constants/constants';
import { jwtDecode } from 'jwt-decode';

const { accessTokenKey, emailKey, refreshTokenKey } = constants.keys;

// LocalStorage utility function (singleton)
export const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage;
    }
    return null; // Return null if window is undefined (SSR)
};
type localStorageReturnType<T> = T | undefined | null;

export const LocalStorage = {
    get: <T>(key: string): localStorageReturnType<T> => getLocalStorage()?.getItem(key) as T,
    set: (key: string, value: string) => getLocalStorage()?.setItem(key, value),
    remove: (key: string) => getLocalStorage()?.removeItem(key),
};

// TokenService
export const TokenService = {
    accessToken: {
        get: (): localStorageReturnType<string> => LocalStorage.get<string>(accessTokenKey),
        set: (token: string) => LocalStorage.set(accessTokenKey, token),
        remove: () => LocalStorage.remove(accessTokenKey),
    },
    refreshToken: {
        get: (): localStorageReturnType<string> => LocalStorage.get<string>(refreshTokenKey),
        set: (token: string) => LocalStorage.set(refreshTokenKey, token),
        remove: () => LocalStorage.remove(refreshTokenKey),
    },
    email: {
        get: (): localStorageReturnType<string> => LocalStorage.get<string>(emailKey),
        set: (email: string) => LocalStorage.set(emailKey, email),
        remove: () => LocalStorage.remove(emailKey),
    },
};

// Function to check if the web token is expired
export const isWebTokenExpired = (token: string, thresholdSeconds: number = 60): boolean => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        if (!exp) {
            console.error('Token does not contain an exp claim');
            return true; // Treat as expired if no exp claim
        }
        const now = Date.now() / 1000;
        return exp - now < thresholdSeconds; // Token expires in less than thresholdSeconds
    } catch (error) {
        console.error('Token expiry check failed:', error);
        return true; // Treat as expired if there was an error decoding the token
    }
};

// Handle login response by saving the tokens in local storage
export const handleLoginResponse = (accessToken: string, refreshToken: string) => {
    TokenService.accessToken.set(accessToken);
    TokenService.refreshToken.set(refreshToken);
};

export const handleLogout = () => {
    TokenService.accessToken.remove();
    TokenService.refreshToken.remove();

    TokenService.email.remove();
};
