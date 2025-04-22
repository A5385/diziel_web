import {
    InitialDataFunction,
    QueryKey,
    UseMutationResult,
    UseQueryResult,
} from '@tanstack/react-query';
import { AccessTokenType, MethodType } from './backend';
import { EndpointsType } from './endpoint';

export type InitialDataType<T> = T | InitialDataFunction<T> | undefined;
export type NotificationMsgType = 'info' | 'success' | 'warning' | 'error';
export type HeaderType = 'json' | 'file';

export type ColumnFiltersState = ColumnFilter[];
export interface ColumnFilter {
    id: string;
    value: unknown;
}
export interface ColumnSort {
    desc: boolean;
    id: string;
}
export type SortingState = ColumnSort[];
export interface SortingTableState {
    sorting: SortingState;
}

export type PFSProps = {
    pagination?: { pageIndex?: number; pageSize?: number };
    filters?: ColumnFiltersState;
    sortBy?: SortingState;
    query?: { key: string; value: string }[];
};

export type CommonAxiosType = {
    queryParams?: PFSProps;
    endpoint: EndpointsType['endpoint'];
    id?: string;
    data?: object;
    headerType?: HeaderType;
};

export type MakeRequestType = CommonAxiosType & {
    method: MethodType;
};

export type AxiosType = CommonAxiosType;

export type NotifyMsgType = {
    message: string;
    type: NotificationMsgType;
};

type CommonProps = {
    endpoint: EndpointsType['endpoint'];
    queryKey: QueryKey;
};
export type QueryPropsType = CommonProps & {
    queryParams?: PFSProps;
    id?: string;
};

export type MutatePropsType = CommonProps & {
    headerType?: 'file' | 'json';
    errorMsg?: string;
};

export type DeleteMutationProps = CommonProps & {
    errorMsg?: string;
};

export type CustomMutationResult<T> = UseMutationResult<
    T | null,
    Error,
    { data: object; id: string },
    unknown
>;

export type CustomUseQueryResult<T> = UseQueryResult<T, Error>;

export type MutationPostReturnType<T> = UseMutationResult<
    NonNullable<Awaited<T>> | null,
    Error,
    { data: object },
    unknown
>;
export type MutationPatchReturnType<T> = UseMutationResult<
    NonNullable<Awaited<T>> | null,
    Error,
    QueryVariablesType,
    unknown
>;

export type QueryVariablesType = { id?: string; data?: object };

export type QueryServiceProps = AccessTokenType & {
    activeProps?: PFSProps;
};
export type QueryServicePropsWithSuspend = QueryServiceProps & {
    suspendProps?: PFSProps;
};

export type QueryPropsWithIdType = { orgId: string; queryParams?: PFSProps };
