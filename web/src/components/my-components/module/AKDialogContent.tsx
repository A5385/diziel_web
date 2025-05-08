'use client';

import { useDialog } from '@/providers/DialogProvider';
import { DialogType } from '@/types/dialog';
import { DataType } from '@/types/ui';
import { useTranslations } from 'next-intl';
import { lazy, ReactNode } from 'react';

const ConfirmationMsg = lazy(() => import('../ConfirmationMsg'));

type ALDialogContentProps<T> = {
    confirmDelete?: () => Promise<void>;
    confirmDeleteMany?: () => Promise<void>;
    data?: DataType<T>;
};

const AKDialogContent = <T,>({ confirmDelete, confirmDeleteMany }: ALDialogContentProps<T>) => {
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
        'new-user': undefined,
        'edit-user': undefined,
    };

    return content[dialogType ?? ''];
};

export default AKDialogContent;
