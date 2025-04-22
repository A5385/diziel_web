import { useDateRange } from '@/hooks/useDateRange';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import React from 'react';
import { AKInput } from '../../my-components/AKInput';

interface TableFiltersProps<TData> {
    table: TableType<TData>;
    openFilter?: boolean;
    setOpenFilter?: React.Dispatch<React.SetStateAction<boolean>>;
    customFilter?: React.ReactNode;
    dateFrom?: Date | undefined;
    setDateFrom?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    dateTo?: Date | undefined;
    setDateTo?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    hideDateFilter?: boolean;
}

export function TableFilters<TData>({
    table,
    customFilter,
    setDateFrom,
    dateFrom,
    dateTo,
    setDateTo,
    hideDateFilter,
}: TableFiltersProps<TData>) {
    const g = useTranslations();
    const customActions = useDateRange({
        from: {
            placeHolder: g('date-from'),
            mode: 'single',
            name: 'dateFrom',
            label: g('date-from'),
            value: dateFrom?.toISOString(),
            onSelect: setDateFrom,
        },
        to: {
            placeHolder: g('date-to'),
            mode: 'single',
            name: 'dateTo',
            label: g('date-to'),
            value: dateTo?.toISOString(),
            onSelect: setDateTo,
        },
    });
    return (
        <div className='grid grid-cols-2 items-start gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'>
            {table
                .getHeaderGroups()[0]
                ?.headers.map(
                    (header) =>
                        !header.isPlaceholder &&
                        header.column.getCanFilter() && (
                            <AKInput
                                key={header.id}
                                label={`${flexRender(header.column.columnDef.header, header.getContext())}`}
                                type='search'
                                placeholder={`Filter ${flexRender(header.column.columnDef.header, header.getContext())} ...`}
                                value={(header.column.getFilterValue() as string) || ''}
                                onChange={(e) => header.column.setFilterValue(e.target.value)}
                            />
                        ),
                )}
            {!hideDateFilter && customActions}
            {customFilter}
        </div>
    );
}
