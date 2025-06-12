import { RequestSchema } from '@/types/schema';
import { PFSProps } from '@/types/service';
import { UseGetTableResponseType } from '@/types/ui';
import {
    useMutationDelete,
    useMutationPost,
    useMutationUpdate,
} from '../react-query-service/mutate-service';
import { useQueryData } from '../react-query-service/query-service';

export const RequestKey = {
    getAll: 'GET_ALL_REQUESTS',
    getById: 'GET_REQUEST_BY_ID',
};

export const GetAllRequests = ({ queryParams }: { queryParams?: PFSProps }) => {
    return useQueryData<UseGetTableResponseType<RequestSchema>>({
        endpoint: 'request/find-all',
        queryKey: [RequestKey.getAll],
        queryParams,
    });
};
export const FindRequestById = () => {
    return useQueryData<RequestSchema>({
        endpoint: 'request/find-all',
        queryKey: [RequestKey.getById],
    });
};

export const CreateRequest = () => {
    return useMutationPost<RequestSchema>({
        endpoint: 'request/create',
        queryKey: [RequestKey.getAll],
    });
};
export const UpdateRequest = () => {
    return useMutationUpdate<RequestSchema>({
        endpoint: 'request/update',
        queryKey: [RequestKey.getAll],
    });
};

export const DeleteRequest = () => {
    return useMutationDelete({
        endpoint: 'request/delete',
        queryKey: [RequestKey.getAll],
    });
};
