import React from 'react';
import { cn } from '../../lib/utils';
import { Label } from '../ui/label';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    label?: string;
    required?: boolean;
    labelStyle?: string;
};

export const AKLabel = ({ label, labelStyle, required, ...props }: LabelProps) => {
    return (
        <Label {...props} className={cn(labelStyle, 'px-1 text-[.7rem]')}>
            {label}
            {required && <span className={required ? 'text-red-500' : ''}>{required && ' *'}</span>}
        </Label>
    );
};
