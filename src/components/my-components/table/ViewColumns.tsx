'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useArabic } from '../../../hooks/useArabic';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../../ui/dropdown-menu';

interface ViewColumnsProps<TData> {
    table: Table<TData>;
    t?: ReturnType<typeof useTranslations>;
}

export function ViewColumns<TData>({ table, t }: ViewColumnsProps<TData>) {
    const g = useTranslations();

    const isRtl = useArabic();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='outline'
                    size='sm'
                    className={cn(isRtl ? 'flex-row-reverse' : 'flex-row', 'flex h-8 gap-4')}
                >
                    <MixerHorizontalIcon className='mr-2 h-4 w-4' />
                    {g('display-columns')}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='text-right'>
                <DropdownMenuLabel className={isRtl ? 'text-right' : 'text-left'}>
                    {g('toggle-columns')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className='h-48'>
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== 'undefined' && column.getCanHide(),
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    className={cn('flex justify-start capitalize')}
                                >
                                    {t ? t(reformatColumnName(column.id)) : ''}
                                </DropdownMenuCheckboxItem>
                            );
                        })}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
const reformatColumnName = (name: string): string =>
    name
        ?.replace(/_/g, '-')
        ?.replace(/([a-z])([A-Z])/g, '$1-$2')
        ?.toLowerCase();
