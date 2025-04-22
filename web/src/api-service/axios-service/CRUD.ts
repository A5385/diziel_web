//packages\api-service\src\http-axios\CRUD.ts
import { AxiosType } from '@/types/service';
import { ResponseType } from 'axios';
import { getHeaders } from './AxiosHeaders';
import { axiosInstance } from './AxiosInstance';
import { buildQueryParams } from './AxiosQueryParams';
import { handleAxiosResponse } from './AxiosResponse';
import { buildUrl } from './AxiosUrl';

export const AxiosService = {
    // axios post request
    post: async <T>(props: Omit<AxiosType, 'id' | 'queryParams'>): Promise<T | undefined> =>
        handleAxiosResponse({
            fn: () =>
                axiosInstance.post(props.endpoint, props.data, {
                    headers: getHeaders(props.headerType),
                }),
            method: 'post',
        }),
    // axios patch request
    patch: async <T>(props: Omit<AxiosType, 'queryParams'>): Promise<T | undefined> =>
        handleAxiosResponse({
            fn: () =>
                axiosInstance.patch(buildUrl(props.endpoint, props.id), props.data, {
                    headers: getHeaders(props.headerType),
                }),
            method: 'patch',
        }),
    // axios delete request
    delete: async (props: Omit<AxiosType, 'data' | 'headerType' | 'queryParams'>): Promise<void> =>
        handleAxiosResponse({
            fn: () => axiosInstance.delete(buildUrl(props.endpoint, props.id)),
            method: 'delete',
        }),
    // axios get request
    get: async <T>({
        queryParams,
        endpoint,
        id,
        responseType,
        fullResponse = false,
    }: Omit<AxiosType, 'data' | 'headerType'> & {
        responseType?: ResponseType | undefined;
        fullResponse?: boolean;
    }): Promise<T | undefined> => {
        const queryString = buildQueryParams(
            queryParams?.pagination,
            queryParams?.filters,
            queryParams?.sortBy,
            queryParams?.query,
        );

        return handleAxiosResponse({
            fn: () =>
                axiosInstance.get(buildUrl(endpoint, id, queryString), {
                    responseType: responseType,
                }),
            fullResponse,
            method: 'get',
        });
    },
};
