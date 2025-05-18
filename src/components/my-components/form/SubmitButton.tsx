'use client';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@/styles/icons';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { AKButton } from '../AKButton';

export type AKSubmitButtonProps<T extends FieldValues> = {
    title?: string;
    form: UseFormReturn<T>;
    showIcon?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
};

const SubmitButton = <T extends FieldValues>({
    title,
    form,
    showIcon,
    fullWidth,
    icon,
}: AKSubmitButtonProps<T>) => {
    const t = useTranslations();
    return (
        <AKButton
            type='submit'
            title={title && t(title)}
            variant='outline'
            color='default'
            disabled={form.formState.isSubmitting}
            iconBefore={showIcon ? icon ? icon : <CheckIcon /> : null}
            className={cn(fullWidth ? 'flex-1' : '', 'bg-main')}
            loading={form.formState.isSubmitting}
        />
    );
};

export default SubmitButton;
