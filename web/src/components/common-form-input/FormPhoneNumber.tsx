import { useArabic } from '@/hooks/useArabic';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { AKFormInput2 } from '../my-components/AKFormInput2';

export const FormPhoneInput = <T extends FieldValues>({
    form,
    span,
    disabled,
    desc,
}: {
    form: UseFormReturn<T>;
    span?: number | undefined;
    disabled?: boolean | undefined;
    desc?: string | undefined;
}) => {
    const g = useTranslations();
    const ar = useArabic();
    return (
        <AKFormInput2
            dir='ltr'
            className={ar ? 'text-right' : 'text-left'}
            inputType='input'
            name={'phone' as Path<T>}
            form={form}
            type='text'
            label={g('phone')}
            placeholder={'+2010xxxxxxxx'}
            required
            disabled={disabled}
            desc={desc}
            maxLength={13}
        />
    );
};
