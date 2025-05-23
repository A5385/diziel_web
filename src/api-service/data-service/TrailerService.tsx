import { TrailerImageSchema, TrailerLicenseSchema, TrailerSchema } from '@/types/schema';
import { PFSProps } from '@/types/service';
import { UseGetTableResponseType } from '@/types/ui';
import {
    useMutationDelete,
    useMutationPost,
    useMutationUpdate,
} from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const TrailerKey = {
    getAll: 'GET_ALL_TRAILERS',
};

export const GetAllTrailers = ({ queryParams }: { queryParams?: PFSProps }) => {
    return useQueryData<UseGetTableResponseType<TrailerSchema>>({
        queryKey: [TrailerKey.getAll],
        endpoint: 'trailer/find-all',
        queryParams,
    });
};

export const CreateTrailer = () => {
    return useMutationPost<TrailerSchema>({
        endpoint: 'trailer/create',
        queryKey: [TrailerKey.getAll],
    });
};
export const UpdateTrailer = () => {
    return useMutationUpdate<TrailerSchema>({
        endpoint: 'trailer/update',
        queryKey: [TrailerKey.getAll],
    });
};

export const DeleteTrailer = () => {
    return useMutationDelete({
        endpoint: 'trailer/delete',
        queryKey: [TrailerKey.getAll],
    });
};

export const UploadTrailerImage = () => {
    return useMutationUpdate<TrailerImageSchema>({
        endpoint: 'trailer/upload-trailer-image',
        queryKey: [TrailerKey.getAll],
        headerType: 'file',
    });
};
export const UploadTrailerLicense = () => {
    return useMutationUpdate<TrailerLicenseSchema>({
        endpoint: 'trailer/upload-license-image',
        queryKey: [TrailerKey.getAll],
        headerType: 'file',
    });
};
