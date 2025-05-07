'use client';

import { DialogSizeType } from '@/types/dialog';
import { SetStateType } from '@/types/ui';
import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useDialog } from '../../providers/DialogProvider';
import { CloseIcon } from '../../styles/icons';
import { BtnPropsType } from './AKButton';
import { MotionSection } from './MotionSection';

export type AKDialogType = {
    buttonProps?: BtnPropsType;
    titleDialog?: string;
    descDialog?: string;
    children?: ReactNode;
    footerContent?: ReactNode;
    open?: boolean;
    setOpen?: SetStateType<boolean>;
    withTrigger?: boolean;
    size?: DialogSizeType;
};

const AKDialog = ({
    titleDialog,
    descDialog,
    children,
    footerContent,
    open,
    setOpen,
    size = 'xl',
}: AKDialogType) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { handleCloseDialog } = useDialog();
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-[90%]',
        default: 'w-auto',
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseDialog();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleKeyDown);
            modalRef.current?.focus();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, handleCloseDialog]);

    return (
        <MotionSection
            show={open ?? false}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            // key='dialog'
            className='fixed inset-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-md'
        >
            <div className={cn('relative w-full', sizeClasses[size])}>
                <div
                    className='max-h-[600px] overflow-auto rounded-xl bg-white shadow-md focus:outline-none dark:bg-slate-600'
                    tabIndex={-1}
                    ref={modalRef}
                    role='dialog'
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-description'
                >
                    {/* title */}
                    {titleDialog && (
                        <div className='flex w-full justify-center p-4'>
                            <h3 id='dialog-title' className='text-lg font-semibold'>
                                {titleDialog}
                            </h3>
                        </div>
                    )}

                    {/* description */}
                    {descDialog && (
                        <div className='flex w-full justify-center p-2' id='dialog-description'>
                            {descDialog}
                        </div>
                    )}

                    {/* content */}
                    <div className='p-4'>{children}</div>

                    {/* footer */}
                    {footerContent && <div className='p-4'>{footerContent}</div>}
                </div>
                <button
                    onClick={() => {
                        handleCloseDialog();
                        if (setOpen) setOpen(false);
                    }}
                    className='absolute -top-2 -right-2 flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-white p-2 shadow-md duration-300 hover:scale-125 hover:shadow-lg dark:bg-slate-600'
                    aria-label='Close'
                >
                    <CloseIcon color={'gray'} />
                </button>
            </div>
        </MotionSection>
    );
};

export default AKDialog;
