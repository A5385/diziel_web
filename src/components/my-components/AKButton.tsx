'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ColorType } from '@/types/ui';
import { ReloadIcon } from '@radix-ui/react-icons';
import { VariantProps } from 'class-variance-authority';
import { forwardRef, ReactNode } from 'react';

export type BtnProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        title?: string;
        color?: ColorType;
        iconBefore?: ReactNode;
        iconAfter?: ReactNode;
        loading?: boolean;
        loadingText?: string;
        className?: string;
    };

const colors: Record<ColorType, string> = {
    red: 'bg-red-500 hover:bg-red-700 text-white',
    orange: 'bg-orange-500 hover:bg-orange-700 text-white',
    gray: 'bg-gray-500 hover:bg-gray-700 text-white',
    green: 'bg-green-500 hover:bg-green-700 text-white',
    purple: 'bg-purple-500 hover:bg-purple-700 text-white',
    default: 'bg-main hover:bg-main-light !text-white',
};

export const AKButton = forwardRef<HTMLButtonElement, BtnProps>(
    (
        {
            title,
            variant = 'ghost',
            color = 'default',
            iconBefore,
            iconAfter,
            loading,
            loadingText = 'Please wait…',
            className,
            disabled,
            asChild,
            ...rest
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        return (
            <Button
                ref={ref}
                asChild={asChild}
                variant={variant}
                disabled={isDisabled}
                aria-busy={loading}
                aria-disabled={isDisabled}
                className={cn(
                    className,
                    variant === 'outline' ? '' : colors[color],
                    isDisabled && 'cursor-not-allowed opacity-50',
                    'flex items-center justify-center gap-3 px-3 py-1.5 transition-all duration-300 ease-in-out',
                )}
                {...rest}
            >
                {loading ? (
                    <span className='flex items-center gap-2'>
                        <ReloadIcon className='h-4 w-4 animate-spin' />
                        {loadingText}
                    </span>
                ) : (
                    <>
                        {iconBefore}
                        {title && <span>{title}</span>}
                        {iconAfter}
                    </>
                )}
            </Button>
        );
    },
);

AKButton.displayName = 'AKButton';
