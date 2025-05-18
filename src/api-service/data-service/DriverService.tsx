import { VisaSchema } from '@/types/schema';
import { useMutationPost, useMutationUpdate } from '../react-query-service/mutate-service';
import { UserKey } from './UserService';

export type CreateDriverProfileResponse = {
    id: string;
    documents: {
        id: string;
        drugTest: {
            id: string;
        };
        license: {
            id: string;
        };
        passport: {
            id: string;
        };
    };
};
export const CreateDriverProfile = () => {
    return useMutationPost<CreateDriverProfileResponse>({
        endpoint: 'driver/create',
        queryKey: [UserKey.GetAllUsers],
    });
};
export const UpdateDriverProfile = () => {
    return useMutationUpdate<CreateDriverProfileResponse>({
        endpoint: 'driver/update',
        queryKey: [UserKey.GetAllUsers],
    });
};

export const UploadCriminalRecord = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-criminal-record',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
export const UploadDrugTest = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-drug-test',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
export const UploadDriverLicense = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-driver-license',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
export const UploadDriverPassport = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-driver-passport',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
export const CreateVisa = () => {
    return useMutationPost<VisaSchema>({
        endpoint: 'driver/create-visa',
        queryKey: [UserKey.GetAllUsers],
    });
};
export const UpdateVisa = () => {
    return useMutationUpdate<VisaSchema>({
        endpoint: 'driver/update-visa',
        queryKey: [UserKey.GetAllUsers],
    });
};
export const UploadVisaImage = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-visa-image',
        queryKey: [UserKey.GetAllUsers],
        headerType: 'file',
    });
};
