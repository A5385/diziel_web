'use client';
import { useLocale } from 'next-intl';
import React, { forwardRef, useState } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AKInputContainer, ContainerProps } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

export type AKInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    containerStyle?: string;
    containerProps?: ContainerProps;
    label?: string;
    labelProps?: Omit<LabelProps, 'label'>;
    errors?: FieldErrors<FieldValues>;
};

export const AKInput = forwardRef<HTMLInputElement, AKInputProps>(
    (
        {
            className,
            required,
            type,
            containerStyle,
            containerProps,
            labelProps,
            label,
            placeholder,
            hidden,
            ...props
        },
        ref,
    ) => {
        const l = useLocale();

        const [show, setShow] = useState(false);

        const defaultInputStyle = cn(
            className,
            hidden && '!hidden',
            '!focus-visible:outline-none border !focus-within:outline-none outline-none',
        );
        const customProps = {
            className: defaultInputStyle,
            required,
            hidden,
            ref,
            type: type === 'password' ? (show ? 'text' : 'password') : type,
            placeholder,
            ...props,
        };

        const defaultLabelProps: LabelProps = {
            htmlFor: props.id,
            required,
            ...labelProps,
        };

        const customContainerProps: ContainerProps = {
            // containerStyle: hidden ? "hidden" : "",
            hidden,
            ...containerProps,
        };

        const renderInput = () => (
            <AKInputContainer {...customContainerProps}>
                {label && <AKLabel {...defaultLabelProps} label={label} />}
                <Input {...customProps} />
            </AKInputContainer>
        );

        const renderPasswordInput = () => (
            <AKInputContainer
                {...containerProps}
                containerStyle={cn(containerStyle, hidden ? 'hidden' : '')}
            >
                {label && <AKLabel {...defaultLabelProps} label={label} />}
                <div className='relative'>
                    <Input {...customProps} />
                    <Button
                        type='button'
                        size='icon'
                        className={cn(
                            l === 'ar' ? 'left-3' : 'right-3',
                            'absolute top-1/2 -translate-y-1/2 transform',
                        )}
                        variant='ghost'
                        onClick={() => setShow(!show)}
                        aria-label={show ? 'Hide password' : 'Show password'}
                    >
                        {show ? (
                            <AiOutlineEyeInvisible size={18} color='gray' />
                        ) : (
                            <AiOutlineEye size={18} color='gray' />
                        )}
                    </Button>
                </div>
            </AKInputContainer>
        );

        switch (type) {
            case 'password':
                return renderPasswordInput();
            default:
                return renderInput();
        }
    },
);
AKInput.displayName = 'AKInput';
