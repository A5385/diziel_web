import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export interface AKDropdownMenuItemProps
    extends Omit<DropdownMenuItemProps, 'className' | 'onClick'> {
    title?: string;
    icon?: ReactNode;
    className?: string;
    onClick?: () => void;
}

export const AKDropdownMenuItem: React.FC<AKDropdownMenuItemProps> = ({
    title,
    icon,
    className,
    onClick,
    ...props
}) => {
    const style = 'flex gap-2 items-center cursor-pointer';
    return (
        <DropdownMenuItem {...props} className={cn(style, className)} onClick={onClick}>
            {icon}
            {title}
        </DropdownMenuItem>
    );
};
