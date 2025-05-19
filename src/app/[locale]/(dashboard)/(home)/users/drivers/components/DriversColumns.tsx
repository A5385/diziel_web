'use client';

import ActionMenu from '@/components/layout/ActionMenu';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { formatPhone } from '@/helpers/formatPhone';
import { useCommonTableColumns } from '@/hooks/CommonTableColumns';
import { cn } from '@/lib/utils';
import { UserSchema } from '@/types/schema';
import { ColumnsProps } from '@/types/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { IoDocumentsOutline } from 'react-icons/io5';
import UserAvatar from '../../components/UserAvatar';
import DriverDocuments from './DriverDocuments';

const DriversColumns = ({ ...props }: ColumnsProps<UserSchema>): ColumnDef<UserSchema>[] => {
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
            accessorKey: 'driverType',
            header: t('driver-type'),
            cell: ({ row }) => {
                return (
                    <div className='flex flex-col font-semibold text-neutral-700 tabular-nums'>
                        {formatPhone(row.getValue('driverType'))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'grade',
            header: t('grade'),
            cell: ({ row }) => {
                return (
                    <div className='flex flex-col font-semibold text-neutral-700 tabular-nums'>
                        {formatPhone(row.getValue('grade'))}
                    </div>
                );
            },
        },
        {
            accessorKey: 'documents',
            header: t('documents'),
            cell: ({ row }) => {
                const documents = row.original?.profile?.driver?.documents;

                return (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='outline'>
                                <IoDocumentsOutline />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='sm:!max-w-3xl'>
                            <SheetHeader className='flex w-full items-center justify-center'>
                                <SheetTitle className='text-5xl font-bold'>
                                    {t('driver-documents')}
                                </SheetTitle>
                            </SheetHeader>
                            <DriverDocuments documents={documents} />
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type='button'>{t('close')}</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
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
            accessorKey: 'nickname',
            header: t('nickname'),
            cell: ({ row }) => {
                const name = row.original?.profile?.nickname;
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
            accessorKey: 'license',
            header: t('license'),
            cell: ({ row }) => {
                const name = row.original?.profile?.nickname;
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

export default DriversColumns;
