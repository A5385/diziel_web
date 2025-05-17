import { QueryPropsType } from '@/types/service';
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosService } from '../axios-service/CRUD';

/* utils ----------------------------------------------------------------- */
const buildQueryKey = (base: QueryKey, extras: Record<string, unknown> = {}): QueryKey => {
    return [
        ...base,
        ...Object.entries(extras)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => ({ [k]: v })),
    ];
};

export const useQueryData = <T,>({
    id,
    endpoint,
    queryKey,
    queryParams,
    ...props
}: QueryPropsType & Omit<UseQueryOptions<T | undefined, Error>, 'queryFn'>): UseQueryResult<
    T | undefined
> => {
    return useQuery<T | undefined>({
        queryKey: buildQueryKey(queryKey, { id, queryParams }),
        queryFn: async () => await AxiosService.get<T>({ endpoint, id, queryParams }),
        ...props,
    });
};
