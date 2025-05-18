'use client';
import { useTranslations } from 'next-intl';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { AKButton } from '../../AKButton';

const CreateAndSaveButton = <T extends FieldValues>({
    form,
    submit,
}: {
    form: UseFormReturn<T>;
    submit: (data: T, action: 'save' | 'continue') => Promise<void>;
}) => {
    const t = useTranslations();
    return (
        <AKButton
            type='button'
            title={t('create-and-continue')}
            color='green'
            onClick={form.handleSubmit((data) => submit(data, 'continue'))}
        />
    );
};

export default CreateAndSaveButton;
