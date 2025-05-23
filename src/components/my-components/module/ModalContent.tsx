'use client';

import TrailerForm from '@/app/[locale]/(dashboard)/(home)/trailers/components/TrailerForm';
import { useDialog } from '@/providers/DialogProvider';
import { DialogType } from '@/types/dialog';
import { TrailerSchema, TruckSchema, UserSchema } from '@/types/schema';
import { DataType } from '@/types/ui';
import { useTranslations } from 'next-intl';
import { lazy, ReactNode } from 'react';

const ConfirmationMsg = lazy(() => import('../ConfirmationMsg'));
const UserForm = lazy(
    () => import('@/app/[locale]/(dashboard)/(home)/users/components/forms/UserForm'),
);
const TruckForm = lazy(
    () => import('@/app/[locale]/(dashboard)/(home)/trucks/components/TruckForm'),
);

type ModalContentProps<TData> = {
    confirmDelete?: () => Promise<void>;
    confirmDeleteMany?: () => Promise<void>;
    data: DataType<TData>;
};

const ModalContent = <TData,>({
    confirmDelete,
    confirmDeleteMany,

    data,
}: ModalContentProps<TData>) => {
    const g = useTranslations();
    const { dialogType } = useDialog();

    const content: Record<DialogType, ReactNode> = {
        '': undefined,
        delete: (
            <ConfirmationMsg
                title={g('delete-title')}
                msg={g('delete-msg')}
                confirmLabel={g('yes-delete')}
                confirmColor='red'
                confirmAction={confirmDelete}
                cancelLabel={g('no-keep')}
                cancelColor='green'
            />
        ),
        'delete-many': (
            <ConfirmationMsg
                title={g('delete-title')}
                msg={g('delete-msg')}
                confirmLabel={g('yes-delete')}
                confirmColor='red'
                confirmAction={confirmDeleteMany}
                cancelLabel={g('no-keep')}
                cancelColor='green'
            />
        ),

        'new-user': <UserForm />,
        'edit-user': <UserForm editUser={data as UserSchema | undefined} />,
        'new-truck': <TruckForm />,
        'edit-truck': <TruckForm editTruck={data as TruckSchema | undefined} />,
        'new-trailer': <TrailerForm />,
        'edit-trailer': <TrailerForm editTrailer={data as TrailerSchema | undefined} />,
    };

    return content[dialogType ?? ''];
};

export default ModalContent;
