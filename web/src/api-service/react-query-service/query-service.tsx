import { QueryPropsType } from '@/types/service';
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosService } from '../axios-service/CRUD';

const buildQueryKey = (queryKey: QueryKey, options: Record<string, any> = {}) => {
    return [...queryKey, options];
};

export const useQueryData = <T,>({
    id,
    endpoint,
    queryKey,
    queryParams,
    ...props
}: QueryPropsType<T> & Omit<UseQueryOptions<T, Error>, 'queryFn'>): UseQueryResult<T> => {
    return useQuery<T>({
        queryKey: buildQueryKey(queryKey, { id, queryParams }),
        queryFn: async () => {
            const res = await AxiosService.get<T>({ endpoint, id, queryParams });
            if (res) {
                return res;
            } else return {} as T;
        },
        ...props,
    });
};
