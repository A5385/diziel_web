'use client';

import AppConfig from '@/constants/AppSettings';
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
                    color: AppConfig.colors.mainColor,
                    className: cn(iconClassName, ' size-8'),
                })}
            <div>
                <h2 className={cn(titleClassName, 'text-main text-2xl font-bold')}>{t(title)}</h2>
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
