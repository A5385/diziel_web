// local-storage-service.ts
import constants from '@/constants/AppSettings';
import { LocalStorage } from '@/helpers/local-storage-service';
import { UserRole } from '@/types/prisma';

const keys = constants.keys;

const useLocalStorage = () => {
    return {
        phone: {
            get: () => LocalStorage.get(keys.phone),
            set: (phone: string) => LocalStorage.set(keys.phone, phone),
            remove: () => LocalStorage.remove(keys.phone),
        },
        role: {
            get: () => LocalStorage.get(keys.role),
            set: (role: UserRole) => LocalStorage.set(keys.role, role as string),
            remove: () => LocalStorage.remove(keys.role),
        },
        profileId: {
            get: () => LocalStorage.get(keys.profileId),
            set: (profileId: string) => LocalStorage.set(keys.profileId, profileId),
            remove: () => LocalStorage.remove(keys.profileId),
        },
        nationalIdNumber: {
            get: () => LocalStorage.get(keys.nationalIdNumber),
            set: (nationalIdNumber: string) =>
                LocalStorage.set(keys.nationalIdNumber, nationalIdNumber),
            remove: () => LocalStorage.remove(keys.nationalIdNumber),
        },
    };
};

export default useLocalStorage;
