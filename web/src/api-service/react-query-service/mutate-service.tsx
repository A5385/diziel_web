import { DeleteMutationProps, MutatePropsType, QueryVariablesType } from '@/types/service';
import {
    QueryClient,
    QueryKey,
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQueryClient,
} from '@tanstack/react-query';
import { AxiosService } from '../axios-service/CRUD';

/**
 * Utility function to invalidate query keys
 */
const BuildQueryKey = async (queryKeys: QueryKey[], queryClient: QueryClient) => {
    await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })));
};

export type MutationFnType<T, Variables> = (variables: Variables) => Promise<T>;

export const createMutation = <T, Variables>(
    mutationFn: MutationFnType<T, Variables>,
    queryKey: QueryKey | QueryKey[],
    queryClient: QueryClient,
): UseMutationOptions<T, Error, Variables> => ({
    mutationFn,
    onSuccess: async () => {
        const resolvedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
        await BuildQueryKey(resolvedQueryKey, queryClient);
    },
});

// Shared mutation options type (for consistency across hooks)
type SharedMutationOptions<T, Variables> = Omit<
    UseMutationOptions<T, Error, Variables>,
    'mutationFn' | 'onSuccess'
>;

/**
 * Mutation hook for POST requests
 */
export const useMutationPost = <T,>({
    endpoint,
    queryKey,
    headerType,
    ...props
}: MutatePropsType & SharedMutationOptions<T | null, { data: object }>): UseMutationResult<
    T | null,
    Error,
    { data: object }
> => {
    const queryClient = useQueryClient();
    const mutationFn: MutationFnType<T | null, { data: object }> = async (variables) => {
        const config = { endpoint, headerType, ...variables };
        return (await AxiosService.post<T>(config)) ?? null;
    };

    return useMutation<T | null, Error, { data: object }>({
        ...createMutation(mutationFn, queryKey, queryClient),
        ...props,
    });
};

/**
 * Mutation hook for PATCH (Update) requests
 */
export const useMutationUpdate = <T,>({
    endpoint,
    queryKey,
    headerType,
    ...props
}: MutatePropsType & SharedMutationOptions<T | null, QueryVariablesType>): UseMutationResult<
    T | null,
    Error,
    QueryVariablesType
> => {
    const queryClient = useQueryClient();
    const mutationFn: MutationFnType<T | null, QueryVariablesType> = async (variables) => {
        const config = { endpoint, headerType, ...variables };
        return (await AxiosService.patch<T>(config)) ?? null;
    };

    return useMutation<T | null, Error, QueryVariablesType>({
        ...createMutation(mutationFn, queryKey, queryClient),
        ...props,
    });
};

/**
 * Mutation hook for DELETE requests
 */
export const useMutationDelete = ({
    endpoint,
    queryKey,
    ...props
}: DeleteMutationProps & SharedMutationOptions<void, string>): UseMutationResult<
    void,
    Error,
    string
> => {
    const queryClient = useQueryClient();
    const mutationFn: MutationFnType<void, string> = async (id) => {
        await AxiosService.delete({ endpoint, id });
    };

    return useMutation<void, Error, string>({
        ...createMutation(mutationFn, queryKey, queryClient),
        ...props,
    });
};
