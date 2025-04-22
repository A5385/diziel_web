'use client';
import constants from '@/constants/constants';
import { TanstackTableProps } from '@/types/ui';
import {
    ColumnPinningState,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { TableBodyComponent } from './TableBodyComponent';
import { TableFilters } from './TableFilters';
import { TablePagination } from './TablePagination';
import { TablePaginationNavigation } from './TablePaginationNavigation';
import { ViewColumns } from './ViewColumns';
import { dynamicAlphanumeric, dynamicIncludesString } from './tableFunctions';

const { colors } = constants;

export const BasicTable = <TValue,>({
    // table data loading
    loadingData: isTableDataLoading,
    // table columns
    columns,
    // table paginate data
    tableData: paginatedTableData,
    pagination = { pageIndex: 0, pageSize: 10 },
    setPagination,

    // sorting
    sorting = [],
    setSorting,
    getSortedRowModel,
    // selection
    setRowSelection,
    rowSelection = {},
    // filter section
    openFilter,
    setOpenFilter,
    customFilters,
    // filtering state
    columnFilters = [],
    setColumnFilters,
    // filtering
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    t,
    hideDateFilter,
}: TanstackTableProps<TValue>) => {
    const g = useTranslations();
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
        left: [],
        right: [],
    });

    const table = useReactTable({
        // table data data:[], total, total_filtering, limit
        data: paginatedTableData?.data || [],

        // table columns
        columns: columns ?? [],

        // This required option is a factory for a function that computes and returns the core row model for the table.
        getCoreRowModel: getCoreRowModel(),

        // row selection
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,

        // sorting
        getSortedRowModel, // Server-side sorting
        sortDescFirst: true,
        manualSorting: true,
        enableMultiSort: true,
        onSortingChange: setSorting,
        sortingFns: { alphanumeric: dynamicAlphanumeric }, // Custom sorting functions

        // pagination
        manualPagination: true,
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(), // Enable pagination
        pageCount: Math.ceil((paginatedTableData?.total || 0) / (paginatedTableData?.limit || 1)),
        // filtering
        manualFiltering: true,
        onColumnFiltersChange: setColumnFilters,
        filterFns: { includesString: dynamicIncludesString }, // Custom filter functions

        // pinning
        enablePinning: true, // Enable column pinning
        onColumnPinningChange: setColumnPinning,

        // resizing
        columnResizeMode: 'onChange', // Enable column resizing

        // default column
        defaultColumn: {
            // size: 100,
            // minSize: 50,
            // maxSize: 300,
            enableResizing: true,
        },

        // table state
        state: { sorting, pagination, columnFilters, rowSelection, columnPinning },
    });

    useEffect(() => {
        if (setPagination) {
            setPagination((pagination) => ({
                pageIndex: 0,
                pageSize: pagination.pageSize,
            }));
        }
    }, [setPagination]);

    const selectedRowCount = useCallback(() => {
        return `${Object.keys(rowSelection).length} ${g('of')} ${
            table.getPreFilteredRowModel().rows.length
        } ${g('total-row-selected')}`;
    }, [g, rowSelection, table]);

    const shouldShowPagination =
        (paginatedTableData?.total ?? 0) >= (paginatedTableData?.limit ?? 0);

    return (
        <div className='w-full'>
            {isTableDataLoading ? (
                <BarLoader color={colors.mainColorLight} width='100%' speedMultiplier={0.75} />
            ) : (
                <div className='w-full space-y-2'>
                    <ViewColumns table={table} t={t} />
                    {openFilter && (
                        <TableFilters
                            table={table}
                            openFilter={openFilter}
                            setOpenFilter={setOpenFilter}
                            customFilter={customFilters}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            setDateFrom={setDateFrom}
                            setDateTo={setDateTo}
                            hideDateFilter={hideDateFilter}
                        />
                    )}
                    <div className='mb-8 w-full overflow-auto'>
                        <TableBodyComponent table={table} setColumnPinning={setColumnPinning} />
                        {shouldShowPagination && (
                            <div className='flex items-center gap-4 px-8 py-4'>
                                {selectedRowCount()}
                                <TablePaginationNavigation table={table} />
                                <TablePagination
                                    table={table}
                                    total={paginatedTableData?.total ?? 0}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
