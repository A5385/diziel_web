import { cn } from '@/lib/utils';
import React from 'react';

export type ModuleContainerProps = {
    children: React.ReactNode;
    className?: string;
};
export const ModuleContainer = ({ children, className }: ModuleContainerProps) => {
    return <main className={cn(className, 'space-y-4')}>{children}</main>;
};

export const ModuleTableContainer = ({ children, className }: ModuleContainerProps) => {
    return (
        <section
            className={cn(
                className,
                'w-full space-y-4 rounded-xl bg-white p-4 shadow-md dark:bg-slate-900',
            )}
        >
            {children}
        </section>
    );
};
export const ModuleCustomSectionContainer = ({ children, className }: ModuleContainerProps) => {
    return (
        <section className={cn(className, 'flex items-center justify-end gap-4')}>
            {children}
        </section>
    );
};
