'use client';

import { btnType, ColorType, onClickBtnType } from '@/types/ui';
import React from 'react';
import { useDialog } from '../../providers/DialogProvider';
import { CancelIcon, CheckIcon } from '../../styles/icons';
import { AKButton } from '../my-components/AKButton';

type ConfirmMsgType = {
    title?: string;
    msg?: string;
    confirmLabel?: string;
    confirmColor?: ColorType;
    confirmAction?: onClickBtnType;
    cancelLabel?: string;
    cancelColor?: ColorType;
    cancelAction?: () => void;
};

const ConfirmationMsg: React.FC<ConfirmMsgType> = ({
    title,
    msg,
    confirmAction,
    cancelAction,
    confirmLabel,
    cancelLabel,
    confirmColor,
    cancelColor,
}) => {
    const commonProps = { type: 'button' as btnType };
    const { handleCloseDialog } = useDialog();
    return (
        <div className='w-tull flex flex-col justify-center'>
            <h4 className='w-full text-center'>{title}</h4>
            <p className='mt-5 mb-8 w-full text-center'>{msg}</p>
            <div className='flex w-full items-center justify-between gap-5 px-5'>
                <AKButton
                    title={confirmLabel}
                    color={confirmColor}
                    icon={<CheckIcon />}
                    onClick={confirmAction}
                    {...commonProps}
                />
                <AKButton
                    {...{
                        ...commonProps,
                        title: cancelLabel,
                        color: cancelColor,
                        icon: <CancelIcon />,
                        onClick: cancelAction ?? handleCloseDialog,
                    }}
                />
            </div>
        </div>
    );
};

export default ConfirmationMsg;
