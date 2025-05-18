'use client';
import { AKButton } from '@/components/my-components/AKButton';
import SubmitButton, { AKSubmitButtonProps } from '@/components/my-components/form/SubmitButton';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { FieldValues } from 'react-hook-form';
import { useUserForm } from './UserFormContext';

const FormNavigation = <T extends FieldValues>({
    show,
    submitProps,
    className,
}: {
    show: boolean;
    submitProps: AKSubmitButtonProps<T>;
    className?: string | undefined;
}) => {
    const t = useTranslations();
    const { nextStep, previousStep, isNextDisabled, isPreviousDisabled } = useUserForm();
    if (show) {
        return (
            <div className={cn(className, 'flex w-full items-center justify-between gap-4')}>
                <AKButton
                    type='button'
                    title={t('previous')}
                    onClick={previousStep}
                    disabled={isPreviousDisabled}
                    className='w-fit'
                />
                <SubmitButton {...submitProps} />
                <AKButton
                    type='button'
                    title={t('next')}
                    onClick={nextStep}
                    disabled={isNextDisabled}
                    className='w-fit'
                />
            </div>
        );
    } else {
        return (
            <div className={cn(className, 'mx-auto flex w-1/2 items-center justify-between gap-4')}>
                <SubmitButton {...submitProps} />
            </div>
        );
    }
};

export default FormNavigation;
