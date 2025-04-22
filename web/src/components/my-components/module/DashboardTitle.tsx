'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { cloneElement, ReactNode } from 'react';
import { IconBaseProps } from 'react-icons/lib';

export type DashboardTypeProps = {
    children?: ReactNode;
    title: string;
    icon: ReactNode;
    iconSize?: number | string; // Add size property
    iconClassName?: string;
    titleClassName?: string;
};

export const DashboardTitle: React.FC<DashboardTypeProps> = ({
    children,
    title,
    icon,
    iconClassName,
    titleClassName,
    iconSize = 30, // Default size
}) => {
    const t = useTranslations();
    return (
        <div className='mb-6 flex items-center gap-4'>
            {React.isValidElement<IconBaseProps>(icon) &&
                cloneElement<IconBaseProps>(icon, {
                    size: iconSize,
                    className: cn(iconClassName, 'text-purple-700 size-8'),
                })}
            <div>
                <h2 className={cn(titleClassName, 'text-2xl font-bold text-purple-700')}>
                    {' '}
                    {t(title)}
                </h2>
                {children}
            </div>
        </div>
        // <div className='w-full space-y-4'>
        //     <h2 className='text-2xl font-bold text-purple-700'>
        //         {IconWithProps}
        //         {`${customTitle ? customTitle : title}`}
        //     </h2>
        //     {children}
        // </div>
    );
};
