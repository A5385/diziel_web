'use client';

import { ColorType, IconType } from '@/types/ui';
import { ReloadIcon } from '@radix-ui/react-icons';
import { VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { useColor } from '../../hooks/useColor';
import { cn } from '../../lib/utils';
import { Button, buttonVariants } from '../ui/button';

export type BtnPropsType = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    } & {
        title?: string | undefined;
        color?: ColorType | undefined;
        iconBefore?: IconType | undefined;
        iconAfter?: IconType | undefined;
        icon?: IconType | undefined;
        loading?: boolean | undefined;
        loadingText?: string;
        className?: string;
    };

export const AKButton = forwardRef<HTMLButtonElement, BtnPropsType>(
    (
        {
            title,
            variant = 'ghost',
            color = 'default',
            iconBefore,
            iconAfter,
            loading,
            icon,
            loadingText = 'Please wait ...',
            className,
            disabled,
            ...rest
        },
        ref,
    ) => {
        const selectedColor = useColor(color);

        return (
            <Button
                ref={ref}
                variant={variant}
                className={cn(
                    className,
                    selectedColor,
                    disabled && 'cursor-not-allowed opacity-50',
                    'item-center easy-in-out flex cursor-pointer justify-center px-3 py-1.5 transition-all duration-300',
                )}
                disabled={disabled || loading}
                {...{
                    ...rest,
                }}
            >
                {loading ? (
                    <span className='flex items-center gap-2'>
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                        {loadingText}
                    </span>
                ) : (
                    <span className='flex !min-h-[42px] items-center justify-center gap-3'>
                        {iconBefore && iconBefore}
                        {icon && icon}
                        {title && <span>{title}</span>}
                        {iconAfter && iconAfter}
                    </span>
                )}
            </Button>
        );
    },
);

AKButton.displayName = 'AKButton';
