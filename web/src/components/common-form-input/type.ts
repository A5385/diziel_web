import { SpanType } from '@/constants/types';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type CommonFormInput<T extends FieldValues> = {
    form: UseFormReturn<T>;
    span?: SpanType | undefined;
    disabled?: boolean | undefined;
    desc?: string | undefined;
    required?: boolean | undefined;
};
