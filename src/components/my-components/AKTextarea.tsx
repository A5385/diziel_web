import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { cn } from '../../lib/utils';
import { Textarea } from '../ui/textarea';
import { AKInputContainer, ContainerProps } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

export type AKTextAreaProps<T extends FieldValues> = React.ComponentProps<'textarea'> & {
    label?: string;
    containerStyle?: string;
    containerProps?: ContainerProps;
    labelProps?: Omit<LabelProps, 'label'>;
    errors?: FieldErrors<T>;
};

export const AKTextarea = <T extends FieldValues>({
    className,
    required,
    containerStyle,
    containerProps,
    labelProps,
    label,

    ...props
}: AKTextAreaProps<T>) => {
    const customProps = {
        className: cn(className, 'w-full'),
        required,
        ...props,
    };
    const defaultLabelProps: LabelProps = {
        htmlFor: props.id,
        required,
        ...labelProps,
    };

    return (
        <AKInputContainer {...containerProps} className={containerStyle}>
            {label && <AKLabel {...defaultLabelProps} label={label} />}
            <Textarea {...customProps} />
        </AKInputContainer>
    );
};
