import { AddressSchema, NationalIdentitySchema, ProfileSchema } from '@/types/schema';
import { useMutationUpdate } from '../react-query-service/mutate-service';

export const UpdateProfile = () => {
    return useMutationUpdate<ProfileSchema>({
        endpoint: 'profile/update',
        queryKey: [],
    });
};
export const UploadProfileImage = () => {
    return useMutationUpdate<ProfileSchema>({
        endpoint: 'profile/upload-profile-image',
        queryKey: [],
        headerType: 'file',
    });
};
export const UpdateProfileAddress = () => {
    return useMutationUpdate<AddressSchema>({
        endpoint: 'profile/update-profile-address',
        queryKey: [],
    });
};

export const UploadNationalImages = () => {
    return useMutationUpdate<NationalIdentitySchema>({
        endpoint: 'profile/upload-national-images',
        queryKey: [],
        headerType: 'file',
    });
};
