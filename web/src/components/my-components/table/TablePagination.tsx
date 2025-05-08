import { Table as TableType } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { AKInput } from '../../my-components/AKInput';

interface TablePaginationProps<TData> {
    table: TableType<TData>;
    total: number;
}

export function TablePagination<TData>({ table, total }: TablePaginationProps<TData>) {
    const t = useTranslations();

    const [pageSizeValue, setPageSizeValue] = useState(table.getState().pagination.pageSize);
    const [pageIndexValue, setPageIndexValue] = useState(table.getState().pagination.pageIndex + 1);

    const debouncePageSizeValue = useDebounce(pageSizeValue, 500);
    const debouncePageIndexValue = useDebounce(pageIndexValue, 500);

    useEffect(() => {
        if (debouncePageSizeValue > 0) {
            table.setPageSize(debouncePageSizeValue);
        }
    }, [debouncePageSizeValue, table]);

    useEffect(() => {
        if (
            debouncePageIndexValue > 0 &&
            debouncePageIndexValue <= table.getPageCount() &&
            debouncePageIndexValue !== table.getState().pagination.pageIndex + 1
        ) {
            table.setPageIndex(debouncePageIndexValue - 1);
        }
    }, [debouncePageIndexValue, table]);

    const handlePageSizeChange = (value: string) => {
        const newSize = Math.max(1, Math.min(Number(value), total));
        setPageSizeValue(newSize);
    };

    const handlePageIndexChange = (value: string) => {
        const newPage = Math.max(1, Math.min(Number(value), table.getPageCount()));
        setPageIndexValue(newPage);
    };

    return (
        <div className='flex items-center gap-4'>
            <div className='flex items-center gap-4 text-sm'>
                <AKInput
                    type='number'
                    value={pageSizeValue}
                    onChange={(e) => handlePageSizeChange(e.target.value)}
                    // className='w-16'
                    min={1}
                    max={total}
                />
                <p className='text-sm text-nowrap'>
                    {`${t('page')} ${table.getState().pagination.pageIndex + 1} ${t('of')} ${table.getPageCount()}`}
                </p>
            </div>
            <span>|</span>
            <span className='flex items-center gap-1 text-sm text-nowrap'>
                {`${t('go-to-page')}`}
                <AKInput
                    type='number'
                    value={pageIndexValue}
                    onChange={(e) => handlePageIndexChange(e.target.value)}
                    // className='w-fit'
                    min={1}
                    max={table.getPageCount()}
                />
            </span>
        </div>
    );
}
