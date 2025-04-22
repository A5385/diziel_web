'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { copyToClipboard } from '@/helpers/copyToClipboard';
import { getUserName } from '@/helpers/getUserName';
import { UserSchema } from '@/types/schema';
import { SetStateType } from '@/types/ui';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';

export type CommonTableProps<T> = {
    selected?: T[];
    setSelected?: SetStateType<T[]>;
    rowSelection?: Record<string, boolean>;
    setRowSelection?: SetStateType<Record<string, boolean>>;
};
export type CommonTableReturn<T> = {
    selectColumn: ColumnDef<T>;
    // createdBy: ColumnDef<T>;
    createdAt: ColumnDef<T>;
    // status: ColumnDef<T>;
    idColumn: ColumnDef<T>;
    createdBy: ColumnDef<T>;
};
export const useCommonTableColumns = <T extends object>({
    setSelected,
    setRowSelection,
}: CommonTableProps<T>): CommonTableReturn<T> => {
    const g = useTranslations();
    const [isCopied, setIsCopied] = useState(false);
    const [copiedCode, setCopiedCode] = useState('');

    const handleCopyRole = (code: string) => {
        const copy = copyToClipboard(code);

        setCopiedCode(code);
        setIsCopied(copy);

        setTimeout(() => setIsCopied(false), 2000);
    };

    const selectColumn: ColumnDef<T> = {
        id: 'select',
        enablePinning: false,
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
                }
                onCheckedChange={(value) => {
                    table.toggleAllPageRowsSelected(!!value);
                    if (value) {
                        const newSelected = table.getRowModel().rows.map((row) => row.original);
                        if (setSelected) {
                            setSelected((prevSelected) => {
                                const selectedIds = new Set(
                                    prevSelected.map((item) => 'id' in item && item?.id),
                                );
                                return [
                                    ...prevSelected,
                                    ...newSelected.filter(
                                        (item) => !selectedIds.has('id' in item && item.id),
                                    ),
                                ];
                            });
                        }
                        if (setRowSelection) {
                            setRowSelection(
                                table.getRowModel().rows.reduce(
                                    (acc, row) => {
                                        acc[row.id] = true;
                                        return acc;
                                    },
                                    {} as Record<string, boolean>,
                                ),
                            );
                        }
                    } else {
                        if (setSelected) setSelected([]);
                        if (setRowSelection) setRowSelection({});
                    }
                }}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <div className='w-[50px]'>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                        if (value) {
                            if (setSelected) {
                                setSelected((prevSelected) => {
                                    const selectedIds = new Set(
                                        prevSelected.map((item) => 'id' in item && item?.id),
                                    );
                                    return selectedIds.has(
                                        ('id' in row.original && row?.original?.id) ?? '',
                                    )
                                        ? prevSelected
                                        : [...prevSelected, row.original];
                                });
                            }
                        } else {
                            if (setSelected) {
                                setSelected((prevSelected) =>
                                    prevSelected.filter(
                                        (item) =>
                                            ('id' in item && item.id) !==
                                            ('id' in row.original && row.original.id),
                                    ),
                                );
                            }
                        }
                    }}
                    aria-label={`Select row ${row.id}`}
                />
            </div>
        ),
    };

    const idColumn: ColumnDef<T> = {
        accessorKey: 'id',
        header: () => <p>{g('id')}</p>,
        cell: ({ row }) => {
            const ele = row.original;
            let id: string | number = '';

            if ('id' in ele) {
                if (typeof ele.id === 'string') {
                    id = `${ele?.id?.slice(0, 10)}...`;
                } else if (typeof ele.id === 'number') {
                    id = ele?.id;
                }
            }

            return (
                <div className='flex items-center justify-start gap-3'>
                    {id}
                    <button type='button' onClick={() => handleCopyRole(row.getValue('id'))}>
                        <BiCopy className='dark:text-gary-200 text-slate-600' />
                    </button>
                    {isCopied && copiedCode === row.getValue('id') && (
                        <span className='text-xs text-green-500'>{g('copied')}</span>
                    )}
                </div>
            );
        },
        enableColumnFilter: false,
    };

    const createdAt: ColumnDef<T> = {
        accessorKey: 'createdAt',
        header: () => <p>{g('created-at')}</p>,
        cell: ({ row }) => {
            const createdAt = format(
                (row?.getValue('createdAt') as Date)?.toString(),
                'dd-MM-yyyy mm-hh',
            ); // Format date as needed
            return <div>{createdAt}</div>;
        },
        enableColumnFilter: false,
    };

    const createdBy: ColumnDef<T> = {
        accessorKey: 'createdBy',
        header: () => <p>{g('created-at')}</p>,
        enableColumnFilter: false,
        cell: ({ row }) => {
            const name: string = getUserName(
                (row?.original as T & { createdBy: UserSchema })?.createdBy,
            );
            return <p>{name}</p>;
        },
    };

    return { selectColumn, createdAt, idColumn, createdBy };
};
