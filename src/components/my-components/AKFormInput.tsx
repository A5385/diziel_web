'use client';

import constants from '@/constants/AppSettings';
import { SpanType } from '@/constants/types';
import { SwitchProps } from '@radix-ui/react-switch';
import React from 'react';
import {
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    Path,
    UseFormReturn,
} from 'react-hook-form';
import { cn } from '../../lib/utils';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { AKCheckBox, AKCheckBoxProps } from './AKCheckbox';
import { AKCombobox, AKComboboxProps } from './AKCombobox';
import { AKDatePicker, AKDatePickerProps } from './AKDatepicker';
import { AKInput, AKInputProps } from './AKInput';
import { AKRadioGroup, AKRadioGroupProps } from './AKRadioGroup';
import { AKSelect, AKSelectProps } from './AKSelect';
import { AKSwitch, AKSwitchProps } from './AKSwitch';
import { AKTextarea, AKTextAreaProps } from './AKTextarea';
import { AKUploadFile, AKUploadProps } from './AKUploadImage';
import { AKPhoneInput, AKPhoneInputProps } from './phone-input';
// import { AKUploadFile, AKUploadProps } from './AKUploadImage';

export type FieldType =
    | 'input'
    | 'text-area'
    | 'check-box'
    | 'group-check-box'
    | 'select'
    | 'combo-box'
    | 'radio-group'
    | 'date'
    | 'switch'
    | 'upload-file'
    | 'attachments'
    | 'phone-input';

export type FormInputPropsType<T extends FieldType, V extends FieldValues> = T extends 'input'
    ? AKInputProps
    : T extends 'select'
      ? AKSelectProps<V>
      : T extends 'text-area'
        ? AKTextAreaProps<V>
        : T extends 'check-box'
          ? AKCheckBoxProps<V>
          : T extends 'group-check-box'
            ? AKCheckBoxProps<V>
            : T extends 'radio-group'
              ? AKRadioGroupProps<V>
              : T extends 'date'
                ? AKDatePickerProps
                : T extends 'switch'
                  ? AKSwitchProps
                  : T extends 'phone-input'
                    ? AKPhoneInputProps
                    : T extends 'upload-file'
                      ? AKUploadProps<V>
                      : never;

export type AKFormInputType<T extends FieldType, V extends FieldValues> = Omit<
    FormInputPropsType<T, V>,
    'form' | 'onChange' | 'value'
> & {
    span?: SpanType;
    desc?: string;
    name: FieldPath<V>;
    form: UseFormReturn<V>;
    formFieldStyle?: string;
    inputType: T;
    descStyle?: React.HTMLAttributes<HTMLParagraphElement>['className'];
};

export const AKFormInput = <T extends FieldType, V extends FieldValues>({
    inputType,
    span = 1,
    desc,
    name,
    formFieldStyle,
    form,
    descStyle,
    ...inputProps
}: AKFormInputType<T, V>) => {
    // const { value: v, onChange: on, ...restOfProps } = inputProps as AKInputProps;

    const renderInput = (
        field: ControllerRenderProps<V, (FormInputPropsType<T, V>['name'] | undefined) & Path<V>>,
    ) => {
        const { value, onChange, ...restOfField } = field;

        switch (inputType) {
            case 'input':
                return (inputProps as AKInputProps).type === 'number' ? (
                    <AKInput
                        {...inputProps}
                        {...field}
                        value={String(field.value)}
                        onChange={(event) => onChange(+event.target.value)}
                        errors={form.formState.errors}
                    />
                ) : (
                    <AKInput {...inputProps} {...field} errors={form.formState.errors} />
                );
            case 'select':
                return (
                    <AKSelect
                        {...(inputProps as unknown as AKSelectProps<V>)}
                        onValueChange={onChange}
                        value={value}
                        {...restOfField}
                        errors={form.formState.errors}
                    />
                );
            case 'text-area':
                return (
                    <AKTextarea
                        {...(inputProps as AKTextAreaProps<V>)}
                        {...field}
                        errors={form.formState.errors}
                    />
                );
            case 'check-box':
            case 'group-check-box':
                return (
                    <AKCheckBox
                        {...(inputProps as AKCheckBoxProps<V>)}
                        {...field}
                        errors={form.formState.errors}
                    />
                );
            case 'radio-group':
                return (
                    <AKRadioGroup
                        {...(inputProps as AKRadioGroupProps<V>)}
                        onValueChange={(v) => onChange(v)}
                        {...restOfField}
                        errors={form.formState.errors}
                    />
                );
            case 'combo-box':
                return (
                    <AKCombobox
                        {...(inputProps as unknown as AKComboboxProps<V>)}
                        {...field}
                        errors={form.formState.errors}
                    />
                );
            case 'switch':
                return (
                    <AKSwitch
                        {...(inputProps as SwitchProps)}
                        checked={value}
                        onCheckedChange={onChange}
                        {...restOfField}
                    />
                );

            case 'date':
                return (
                    <AKDatePicker
                        value={value}
                        mode='single'
                        selected={field.value}
                        onSelect={onChange}
                        {...restOfField}
                        {...inputProps}
                    />
                );
            case 'upload-file':
                return <AKUploadFile {...(inputProps as unknown as AKUploadProps<V>)} {...field} />;

            case 'phone-input':
                return <AKPhoneInput {...inputProps} {...field} errors={form.formState.errors} />;

            default:
                return <p>Invalid input field type</p>;
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full', constants.span[span], formFieldStyle)}>
                    <FormControl>{renderInput(field)}</FormControl>
                    {desc && (
                        <FormDescription className={cn(descStyle, 'text-yellow-600')}>
                            {desc}
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
