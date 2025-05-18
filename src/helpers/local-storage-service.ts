// local-storage-service.ts
import constants from '@/constants/AppSettings';
import { decryptData, encryptData } from './data-encryption';

const keys = constants.keys;

// LocalStorage utility function (singleton)
export const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
        return window.localStorage;
    }
    return null; // Return null if window is undefined (SSR)
};

export const LocalStorage = {
    get: (key: string) => {
        const value = getLocalStorage()?.getItem(key);
        if (value) return decryptData(value);
    },
    set: (key: string, value: string) => {
        const encryptValue = encryptData(value);
        if (encryptValue) getLocalStorage()?.setItem(key, encryptValue); // <-- FIXED
    },
    remove: (key: string) => getLocalStorage()?.removeItem(key),
};
