'use client';

import ActionMenu from '@/components/layout/ActionMenu';
import { formatPhone } from '@/helpers/formatPhone';
import { useCommonTableColumns } from '@/hooks/CommonTableColumns';
import { cn } from '@/lib/utils';
import { UserSchema } from '@/types/schema';
import { ColumnsProps } from '@/types/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import UserAvatar from '../../components/UserAvatar';

const AgenciesColumns = ({ ...props }: ColumnsProps<UserSchema>): ColumnDef<UserSchema>[] => {
    const t = useTranslations();

    const { selectColumn, idColumn, ...commonColumns } = useCommonTableColumns<UserSchema>({
        ...props,
    });

    // const toggleBlock = ToggleBlockUser();
    // const handleToggleBlock = async (userId: string) =>
    //     await toggleBlock.mutateAsync({ id: userId });

    return [
        selectColumn,
        idColumn,
        {
            accessorKey: 'image',
            header: t('image'),
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                const user = row.original;
                return <UserAvatar user={user} />;
            },
        },
        {
            accessorKey: 'phone',
            header: t('phone'),
            cell: ({ row }) => {
                return (
                    <div
                        className='flex flex-col font-semibold text-neutral-700 tabular-nums'
                        dir='ltr'
                    >
                        {formatPhone(row.getValue('phone'))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'fullName',
            header: t('fullName'),
            cell: ({ row }) => {
                const name = row.original?.profile?.fullName;
                const profileComplete = row?.original?.profile?.profileComplete;
                return (
                    <div
                        className={cn(
                            profileComplete === null && 'text-sm text-red-500',
                            'flex flex-col font-medium',
                        )}
                    >
                        {profileComplete ? name : t('profile-not-complete')}
                    </div>
                );
            },
        },

        // {
        //     accessorKey: 'blocked',
        //     header: t('blocked'),
        //     enableColumnFilter: false,
        //     cell: ({ row }) => {
        //         const blocked = row.original.blocked ?? false;
        //         const userId = row.original.id ?? '';
        //         return (
        //             <Switch checked={blocked} onCheckedChange={() => handleToggleBlock(userId)}>
        //                 {blocked ? t('blocked') : t('Active')}
        //             </Switch>
        //         );
        //     },
        // },

        ...Object.values(commonColumns),
        {
            id: 'actions',
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                const item = row.original;
                return <ActionMenu itemId={item?.id ?? ''} editType='edit-user' dialogSize='3xl' />;
            },
        },
    ];
};

export default AgenciesColumns;
