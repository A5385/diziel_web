'use client';

import ActionMenu from '@/components/layout/ActionMenu';
import { useCommonTableColumns } from '@/hooks/CommonTableColumns';
import { TruckSchema } from '@/types/schema';
import { ColumnsProps } from '@/types/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

const TruckColumns = ({ ...props }: ColumnsProps<TruckSchema>): ColumnDef<TruckSchema>[] => {
    const t = useTranslations();

    const { selectColumn, idColumn, ...commonColumns } = useCommonTableColumns<TruckSchema>({
        ...props,
    });

    return [
        selectColumn,
        idColumn,

        {
            accessorKey: 'plateNumber',
            header: t('plate-number'),
            cell: ({ row }) => row.getValue('plateNumber'),
        },
        {
            accessorKey: 'type',
            header: t('type'),
            cell: ({ row }) => row.getValue('type'),
        },
        {
            accessorKey: 'brand',
            header: t('brand'),
            cell: ({ row }) => row.getValue('brand'),
        },
        {
            accessorKey: 'axleCount',
            header: t('axle-count'),
            cell: ({ row }) => row.getValue('axleCount'),
        },
        {
            accessorKey: 'modelYear',
            header: t('model-year'),
            cell: ({ row }) => row.getValue('modelYear'),
        },
        {
            accessorKey: 'cargoType',
            header: t('cargo-type'),
            cell: ({ row }) => row.getValue('cargoType'),
        },
        {
            accessorKey: 'maxLoad',
            header: t('max-load'),
            cell: ({ row }) => row.getValue('maxLoad'),
        },
        {
            accessorKey: 'safetyEquipment',
            header: t('safety-equipment'),
            cell: ({ row }) => row.getValue('safetyEquipment'),
        },
        {
            accessorKey: 'chassisNumber',
            header: t('chassis-number'),
            cell: ({ row }) => row.getValue('chassisNumber'),
        },
        {
            accessorKey: 'engineNumber',
            header: t('engine-number'),
            cell: ({ row }) => row.getValue('engineNumber'),
        },

        ...Object.values(commonColumns),
        {
            id: 'actions',
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <ActionMenu itemId={item?.id ?? ''} editType='edit-truck' dialogSize='5xl' />
                );
            },
        },
    ];
};

export default TruckColumns;
