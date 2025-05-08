import { CaretSortIcon } from '@radix-ui/react-icons';
import {
    Column,
    ColumnPinningState,
    flexRender,
    Header,
    Table as TableType,
} from '@tanstack/react-table';
import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { useArabic } from '../../../hooks/useArabic';
import { cn } from '../../../lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { PinButton } from './PinButton';

interface TableComponentProps<TData> {
    table: TableType<TData>;

    setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
}

export function TableBodyComponent<TData>({ table, setColumnPinning }: TableComponentProps<TData>) {
    const isRTL = useArabic(); // Detect if the layout is RTL (Arabic, etc.)

    const sortToggler = (header: Header<TData, unknown>) => {
        if (header.column.getCanSort()) {
            header.column.toggleSorting(undefined, true);
        }
    };

    const getCommonPinningClasses = <TData,>(column: Column<TData>): CSSProperties => {
        const isPinned = column.getIsPinned();
        const left = isRTL
            ? undefined
            : isPinned === 'left'
              ? `${column.getStart('left')}px`
              : undefined;
        const right = isRTL
            ? isPinned === 'left'
                ? `${column.getStart('left')}px`
                : undefined
            : undefined;

        return {
            position: isPinned ? 'sticky' : 'relative',
            left, // For LTR
            right, // For RTL
            textAlign: isRTL ? 'right' : 'left',
            zIndex: isPinned ? 1 : 0,
            backgroundColor: isPinned ? '#dbeafe' : '',
            width: column.getSize(),
            boxShadow:
                isPinned === (isRTL ? 'left' : 'right')
                    ? '4px 0 4px -4px gray inset'
                    : isPinned === (isRTL ? 'right' : 'left')
                      ? '-4px 0 4px -4px gray inset'
                      : undefined,
        };
    };

    return (
        <Table className='w-full overflow-auto text-nowrap'>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className='bg-gray-100 text-gray-800'>
                        {headerGroup.headers.map((header) => {
                            const style = getCommonPinningClasses(header.column);
                            return (
                                <TableHead
                                    key={header.id}
                                    className={cn(
                                        'bg-blue-100 !px-0 py-3 text-sm font-medium !text-nowrap text-slate-800 dark:bg-slate-700 dark:text-slate-200', // Add more horizontal (px-6) and vertical padding (py-3)
                                    )}
                                    style={style}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={cn(
                                                'flex items-center justify-between px-2',
                                                isRTL
                                                    ? '[&:has([role=checkbox])]:pr-2 [&>[role=checkbox]]:-translate-y-[2px]'
                                                    : '[&:has([role=checkbox])]:pl-2 [&>[role=checkbox]]:translate-y-[2px]',
                                            )}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            <div className='flex items-center'>
                                                {header.column.columnDef.enablePinning && (
                                                    <PinButton
                                                        header={header}
                                                        setColumnPinning={setColumnPinning}
                                                    />
                                                )}
                                                {header.column.getCanSort() && (
                                                    <>
                                                        {header.column.getIsSorted() === 'asc' ||
                                                        header.column.getIsSorted() === 'desc' ? (
                                                            <span
                                                                onClick={() => sortToggler(header)}
                                                                className='cursor-pointer'
                                                            >
                                                                {header.column.getIsSorted() ===
                                                                'asc'
                                                                    ? '↑'
                                                                    : '↓'}
                                                            </span>
                                                        ) : (
                                                            <CaretSortIcon
                                                                onClick={() => sortToggler(header)}
                                                                className='cursor-pointer'
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={100} className='py-4 text-center text-gray-500'>
                            No data found
                        </TableCell>
                    </TableRow>
                ) : (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className={cn(
                                'text-sm text-slate-800 even:bg-slate-50 dark:text-slate-200 dark:even:bg-slate-600',
                            )} // Add vertical padding for rows
                        >
                            {row.getVisibleCells().map((cell) => {
                                const style = getCommonPinningClasses(cell.column);
                                return (
                                    <TableCell
                                        key={cell.id}
                                        className={cn(
                                            'py-4 !text-nowrap',
                                            isRTL
                                                ? 'text-right [&:has([role=checkbox])]:pr-2 [&>[role=checkbox]]:-translate-y-[2px]'
                                                : 'text-left [&:has([role=checkbox])]:pl-2 [&>[role=checkbox]]:translate-y-[2px]',
                                        )}
                                        style={style}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
