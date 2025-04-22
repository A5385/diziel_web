'use client';

import constants from '@/constants/constants';
import { SpanType } from '@/constants/types';
import { SwitchProps } from '@radix-ui/react-switch';
import React from 'react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
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
import { AKAttachmentProps, AKUploadAttachments } from './AKUploadAttachments';
// import { AKUploadFile, AKUploadProps } from './AKUploadImage';

export type FieldType2 =
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
    | 'attachments';

export type FormInput2PropsType<T extends FieldType2> = T extends 'input'
    ? AKInputProps
    : T extends 'select'
      ? AKSelectProps
      : T extends 'text-area'
        ? AKTextAreaProps
        : T extends 'check-box'
          ? AKCheckBoxProps
          : T extends 'group-check-box'
            ? AKCheckBoxProps
            : T extends 'radio-group'
              ? AKRadioGroupProps
              : T extends 'combo-box'
                ? AKComboboxProps
                : T extends 'date'
                  ? AKDatePickerProps
                  : T extends 'switch'
                    ? AKSwitchProps
                    : // : T extends 'upload-file'
                      //   ? AKUploadProps
                      T extends 'attachments'
                      ? AKAttachmentProps
                      : never;

export type AKFormInput2Type<T extends FieldType2, V extends FieldValues> = Omit<
    FormInput2PropsType<T>,
    'form'
> & {
    span?: SpanType;
    desc?: string;
    name: FieldPath<V>;
    form: UseFormReturn<V>;
    formFieldStyle?: string;
    inputType: T;
    descStyle?: React.HTMLAttributes<HTMLParagraphElement>['className'];
};

export const AKFormInput2 = <T extends FieldType2, V extends FieldValues>({
    inputType,
    span = 1,
    desc,
    name,
    formFieldStyle,
    form,
    descStyle,
    ...inputProps
}: AKFormInput2Type<T, V>) => {
    const width = constants.span[span];
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { value: v, onChange: on, ...restOfProps } = inputProps as AKInputProps;

    const renderInput = (field: any) => {
        const { value, onChange, ...restOfField } = field;

        switch (inputType) {
            case 'input':
                return (restOfProps as AKInputProps).type === 'number' ? (
                    <AKInput
                        {...inputProps}
                        {...field}
                        value={String(field.value)}
                        onChange={(event) => field.onChange(+event.target.value)}
                        errors={form.formState.errors}
                    />
                ) : (
                    <AKInput {...inputProps} {...field} errors={form.formState.errors} />
                );
            case 'select':
                return (
                    <AKSelect
                        {...(restOfProps as unknown as AKSelectProps)}
                        onValueChange={onChange}
                        value={value}
                        {...restOfField}
                        errors={form.formState.errors}
                    />
                );
            case 'text-area':
                return (
                    <AKTextarea
                        {...(restOfProps as AKTextAreaProps)}
                        {...field}
                        errors={form.formState.errors}
                    />
                );
            case 'check-box':
            case 'group-check-box':
                return (
                    <AKCheckBox
                        {...(restOfProps as AKCheckBoxProps)}
                        {...field}
                        errors={form.formState.errors}
                    />
                );
            case 'radio-group':
                return (
                    <AKRadioGroup
                        {...(restOfProps as AKRadioGroupProps)}
                        onValueChange={(v) => onChange(v)}
                        {...restOfField}
                        errors={form.formState.errors}
                    />
                );
            case 'combo-box':
                return (
                    <AKCombobox
                        {...(restOfProps as unknown as AKComboboxProps)}
                        {...field}
                        errors={form.formState.errors}
                    />
                );
            case 'switch':
                return (
                    <AKSwitch
                        {...(restOfProps as SwitchProps)}
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
                        onSelect={field.onChange}
                        {...restOfField}
                        {...(restOfProps as unknown as AKDatePickerProps)}
                    />
                );
            // case 'upload-file':
            //     return <AKUploadFile {...(restOfProps as unknown as AKUploadProps)} {...field} />;
            case 'attachments':
                return (
                    <AKUploadAttachments
                        {...(restOfProps as unknown as AKAttachmentProps)}
                        {...field}
                    />
                );
            default:
                return <p>Invalid input field type</p>;
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('w-full space-y-1', width, formFieldStyle)}>
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
