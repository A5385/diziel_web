'use client';

import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useCallback, useState } from 'react';
import { useDebounce } from './useDebounce';

const pageSize = 10,
    pageIndex = 0;

export const useQueryState = <T,>() => {
    const [selected, setSelected] = useState<T[]>([]);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sortBy, setSortBy] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex,
        pageSize,
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const filters: ColumnFiltersState = useDebounce(columnFilters, 1000);

    const resetState = useCallback(() => {
        setSelected([]);
        setRowSelection({});
        setSortBy([]);
        setColumnFilters([]);
        setPagination({ pageIndex, pageSize });
    }, []);

    return {
        queryState: {
            sortBy,
            pagination,
            filters,
        },
        columnsProps: {
            selected,
            setSelected,
            rowSelection,
            setRowSelection,
        },
        tableProps: {
            pagination,
            setPagination,
            sorting: sortBy,
            setSorting: setSortBy,
            columnFilters,
            setColumnFilters,
            rowSelection,
            setRowSelection,
        },
        resetState,
        filters,
        selected,
        setSelected,
        pagination,
        setPagination,
        sortBy,
        setSortBy,
        rowSelection,
        setRowSelection,
        columnFilters,
        setColumnFilters,
    };
};
