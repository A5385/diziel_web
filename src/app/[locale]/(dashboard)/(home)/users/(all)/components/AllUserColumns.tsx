'use client';

import ActionMenu from '@/components/layout/ActionMenu';
import { Badge } from '@/components/ui/badge';
import { formatPhone } from '@/helpers/formatPhone';
import { useCommonTableColumns } from '@/hooks/CommonTableColumns';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { ColumnsProps } from '@/types/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import UserAvatar from '../../components/UserAvatar';

const AllUserColumns = ({ ...props }: ColumnsProps<UserSchema>): ColumnDef<UserSchema>[] => {
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

        {
            accessorKey: 'role',
            header: t('role'),
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                const role = row?.original?.role;
                const mapRoleColor: Record<UserRole, string> = {
                    admin: 'bg-red-300 text-red-700', // Important / powerful
                    agency: 'bg-gray-300 text-gray-700', // Neutral / organizational
                    client: 'bg-blue-200 text-blue-700', // Trustworthy / passive
                    operator: 'bg-indigo-200 text-indigo-700', // Technical / system-related
                    employee: 'bg-green-200 text-green-700', // Stable / active
                    agencyAgent: 'bg-yellow-200 text-yellow-700', // Field / external rep
                    owner: 'bg-purple-200 text-purple-700', // Executive / high-level
                    driver: 'bg-orange-200 text-orange-700', // Active / on-the-ground
                };
                return (
                    <Badge
                        className={cn(
                            mapRoleColor[role as UserRole],
                            'flex min-w-20 flex-col items-center justify-center capitalize',
                        )}
                    >
                        {t(role ?? 'client')}
                    </Badge>
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
            header: t('actions'),
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                const item = row.original;
                return <ActionMenu itemId={item?.id ?? ''} editType='edit-user' dialogSize='3xl' />;
            },
        },
    ];
};

export default AllUserColumns;
