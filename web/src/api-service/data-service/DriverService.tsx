import { VisaSchema } from '@/types/schema';
import { useMutationPost, useMutationUpdate } from '../react-query-service/mutate-service';

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
        queryKey: [],
    });
};

export const UploadCriminalRecord = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-criminal-record',
        queryKey: [],
        headerType: 'file',
    });
};
export const UploadDrugTest = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-drug-test',
        queryKey: [],
        headerType: 'file',
    });
};
export const UploadDriverLicense = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-driver-license',
        queryKey: [],
        headerType: 'file',
    });
};
export const UploadDriverPassport = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-driver-passport',
        queryKey: [],
        headerType: 'file',
    });
};
export const CreateVisa = () => {
    return useMutationPost<VisaSchema>({
        endpoint: 'driver/create-visa',
        queryKey: [],
    });
};
export const UploadVisaImage = () => {
    return useMutationUpdate({
        endpoint: 'driver/upload-visa-image',
        queryKey: [],
        headerType: 'file',
    });
};
