'use client';

import ActionMenu from '@/components/layout/ActionMenu';
import { useCommonTableColumns } from '@/hooks/CommonTableColumns';
import { RequestSchema } from '@/types/schema';
import { ColumnsProps } from '@/types/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

const RequestColumns = ({ ...props }: ColumnsProps<RequestSchema>): ColumnDef<RequestSchema>[] => {
    const t = useTranslations();

    const { selectColumn, idColumn, ...commonColumns } = useCommonTableColumns<RequestSchema>({
        ...props,
    });

    return [
        selectColumn,
        idColumn,

        {
            accessorKey: 'carType',
            header: t('car-type'),
            cell: ({ row }) => row.getValue('carType'),
        },
        {
            accessorKey: 'cargoType',
            header: t('cargo-type'),
            cell: ({ row }) => row.getValue('cargoType'),
        },
        {
            accessorKey: 'unitType',
            header: t('unit-type'),
            cell: ({ row }) => row.getValue('unitType'),
        },
        {
            accessorKey: 'unitCount',
            header: t('unit-count'),
            cell: ({ row }) => row.getValue('unitCount'),
        },
        {
            accessorKey: 'pickupLocation',
            header: t('pickup-location'),
            cell: ({ row }) => row.getValue('pickupLocation'),
        },
        {
            accessorKey: 'distanceKM',
            header: t('distance-km'),
            cell: ({ row }) => row.getValue('distanceKM'),
        },
        {
            accessorKey: 'priceEstimate',
            header: t('price-estimate'),
            cell: ({ row }) => row.getValue('priceEstimate'),
        },
        {
            accessorKey: 'transportType',
            header: t('transport-type'),
            cell: ({ row }) => row.getValue('transportType'),
        },
        {
            accessorKey: 'paymentOption',
            header: t('payment-option'),
            cell: ({ row }) => row.getValue('paymentOption'),
        },
        {
            accessorKey: 'advancePayment',
            header: t('advance-payment'),
            cell: ({ row }) => row.getValue('advancePayment'),
        },
        {
            accessorKey: 'status',
            header: t('status'),
            cell: ({ row }) => row.getValue('status'),
        },
        {
            accessorKey: 'notes',
            header: t('notes'),
            cell: ({ row }) => row.getValue('notes'),
        },

        ...Object.values(commonColumns),
        {
            id: 'actions',
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <ActionMenu itemId={item?.id ?? ''} editType='edit-request' dialogSize='5xl' />
                );
            },
        },
    ];
};

export default RequestColumns;
