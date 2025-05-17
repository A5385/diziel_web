'use client';
import { AKButton } from '@/components/my-components/AKButton';
import { useTranslations } from 'next-intl';
import { useUserForm } from './UserFormContext';

const FormNavigation = ({ show }: { show: boolean }) => {
    const t = useTranslations();
    const { nextStep, previousStep, isNextDisabled, isPreviousDisabled } = useUserForm();
    if (show) {
        return (
            <div className='col-span-3 mt-4 flex w-full items-center justify-evenly'>
                <AKButton
                    type='button'
                    title={t('next')}
                    onClick={nextStep}
                    disabled={isNextDisabled}
                    className='w-1/3'
                />
                <AKButton
                    type='button'
                    title={t('previous')}
                    onClick={previousStep}
                    disabled={isPreviousDisabled}
                    className='w-1/3'
                />
            </div>
        );
    } else {
        return null;
    }
};

export default FormNavigation;
