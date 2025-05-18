import { AddressSchema, NationalIdentitySchema, ProfileSchema } from '@/types/schema';
import { useMutationUpdate } from '../react-query-service/mutate-service';
import { UserKey } from './UserService';

export const UpdateProfile = () => {
    return useMutationUpdate<ProfileSchema>({
        endpoint: 'profile/update',
        queryKey: [UserKey.GetAllUsers],
    });
};
export const UploadProfileImage = () => {
    return useMutationUpdate<ProfileSchema>({
        endpoint: 'profile/upload-profile-image',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
export const UpdateProfileAddress = () => {
    return useMutationUpdate<AddressSchema>({
        endpoint: 'profile/update-profile-address',
        queryKey: [UserKey.GetAllUsers],
    });
};

export const UploadNationalImages = () => {
    return useMutationUpdate<NationalIdentitySchema>({
        endpoint: 'profile/upload-national-images',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
