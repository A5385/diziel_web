'use client';

import { DialogSizeType, DialogType } from '@/types/dialog';

import { cn } from '@/lib/utils';
import { useDialog } from '@/providers/DialogProvider';
import { DeleteIcon, EditIcon } from '@/styles/icons';
import { useTranslations } from 'next-intl';
import React from 'react';
import { AKDropdownMenuItem } from '../my-components/AKDropdownMenuItem';

export interface CommonDropdownProps {
    noEdit?: boolean;
    noDelete?: boolean;
    itemId?: string;
    editType?: DialogType;
    dialogSize?: DialogSizeType;
    editFn?: () => void;
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({
    itemId,
    noEdit = false,
    noDelete = false,
    editType,
    dialogSize = 'md',
    editFn,
}) => {
    const g = useTranslations();
    const commonClassName = '';
    const { handleOpenDialog } = useDialog();

    const iconProps = {
        size: 12,
    };

    const handleEdit = () => {
        if (editFn) {
            editFn();
        } else {
            handleOpenDialog({ type: editType ?? '', itemId, dialogSize: dialogSize ?? 'xl' });
        }
    };

    const handleDelete = () => {
        handleOpenDialog({
            type: 'delete',
            itemId,
            dialogSize: 'sm',
        });
    };

    return (
        <>
            {!noEdit && (
                <AKDropdownMenuItem
                    className={cn(commonClassName, 'text-green-500')}
                    onClick={handleEdit}
                    icon={<EditIcon {...iconProps} color='green' />}
                    title={g('edit')}
                />
            )}
            {!noDelete && (
                <AKDropdownMenuItem
                    className={cn(commonClassName, 'text-red-500 hover:bg-orange-200')}
                    onClick={handleDelete}
                    icon={<DeleteIcon {...iconProps} color='red' />}
                    title={g('delete')}
                />
            )}
        </>
    );
};

export default CommonDropdown;
