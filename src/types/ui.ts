import {
    ColumnDef,
    ColumnFiltersState,
    OnChangeFn,
    PaginationState,
    RowModel,
    RowSelectionState,
    SortingState,
    Table,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { ChangeEvent, Dispatch, MouseEventHandler, ReactNode, SetStateAction } from 'react';

export type IconType = ReactNode;
export type ChildrenType = { children: ReactNode };
export type SetStateType<T> = Dispatch<SetStateAction<T>>;
export type ColorType = 'red' | 'green' | 'orange' | 'gray' | 'default' | 'purple';
export type btnType = 'button' | 'reset' | 'submit';
export type VariantType = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type BtnSize = 'default' | 'icon' | 'sm' | 'lg';
export type TextInputType =
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'date'
    | 'textarea'
    | 'tel'
    | 'search';

export type FormInputType = 'upload' | 'input-text' | 'select' | 'date' | 'switch' | 'attachments';
export type CompPosition = 'start' | 'end' | 'center' | 'evenly';

export type DataType<T> = T | undefined;
export type ArrayDataType<T> = T[] | undefined;

export type OnChangeEventType = ChangeEvent<HTMLInputElement>;
export type OnChangeType = (e: OnChangeEventType) => void;
export type OnValueChangeType = (value: string) => void;
export type onClickBtnType = MouseEventHandler<HTMLButtonElement> | undefined;

export type ColumnsProps<T extends object> = {
    selected?: T[];
    rowSelection?: Record<string, boolean>;
    setRowSelection?: SetStateType<Record<string, boolean>>;
    setSelected?: SetStateType<T[]>;
};

export interface TanstackTableProps<TValue> {
    // table data
    loadingData?: boolean | undefined;
    tableData?: UseGetTableResponseType<TValue> | null | undefined;
    columns?: ColumnDef<TValue>[];

    // pagination
    pagination?: PaginationState;
    setPagination?: Dispatch<SetStateAction<PaginationState>>;

    // sorting
    sorting?: SortingState;
    setSorting?: Dispatch<SetStateAction<SortingState>>;

    // column filters
    columnFilters?: ColumnFiltersState;
    setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;

    // row selection
    setRowSelection?: OnChangeFn<RowSelectionState>;
    rowSelection?: RowSelectionState;
    getSortedRowModel?: ((table: Table<TValue>) => () => RowModel<TValue>) | undefined;

    // filter props
    openFilter?: boolean;
    setOpenFilter?: Dispatch<SetStateAction<boolean>>;
    customFilters?: ReactNode;
    t?: ReturnType<typeof useTranslations>;
    dateFrom?: Date | undefined;
    setDateFrom?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    dateTo?: Date | undefined;
    setDateTo?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    hideDateFilter?: boolean;
}

export interface UseGetTableResponseType<TValue> {
    limit?: number;
    page?: number;
    total?: number;
    total_filtered?: number;
    data: TValue[];
}

export type SideBarListType = {
    id: number;
    title: string;
    icon?: IconType;
    url: string;
    haveAccess?: boolean;
    roundedAll?: boolean;
};

export type SidebarListTypeWithSubmenu = SideBarListType & {
    subMenu?: SideBarListType[];
};

export type DynamicLinkProps = {
    item: SideBarListType;
    open?: boolean;
};
