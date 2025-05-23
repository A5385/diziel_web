import { TruckImageSchema, TruckSchema } from '@/types/schema';
import { PFSProps } from '@/types/service';
import { UseGetTableResponseType } from '@/types/ui';
import {
    useMutationDelete,
    useMutationPost,
    useMutationUpdate,
} from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const TruckKey = {
    getAll: 'GET_ALL_TRUCKS',
};

export const GetAllTrucks = ({ queryParams }: { queryParams?: PFSProps }) => {
    return useQueryData<UseGetTableResponseType<TruckSchema>>({
        queryKey: [TruckKey.getAll],
        endpoint: 'truck/find-all',
        queryParams,
    });
};

export const CreateTruck = () => {
    return useMutationPost<TruckSchema>({
        endpoint: 'truck/create',
        queryKey: [TruckKey.getAll],
    });
};
export const UpdateTruck = () => {
    return useMutationUpdate<TruckSchema>({
        endpoint: 'truck/update',
        queryKey: [TruckKey.getAll],
    });
};

export const DeleteTruck = () => {
    return useMutationDelete({
        endpoint: 'truck/delete',
        queryKey: [TruckKey.getAll],
    });
};

export const UploadTruckImage = () => {
    return useMutationUpdate<TruckImageSchema>({
        endpoint: 'truck/upload-truck-image',
        queryKey: [TruckKey.getAll],
        headerType: 'file',
    });
};
export const UploadTruckLicense = () => {
    return useMutationUpdate<TruckImageSchema>({
        endpoint: 'truck/upload-license-image',
        queryKey: [TruckKey.getAll],
        headerType: 'file',
    });
};
