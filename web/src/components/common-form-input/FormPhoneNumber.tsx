import { useArabic } from '@/hooks/useArabic';
import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

export const FormPhoneInput = <T extends FieldValues>({
    form,
    span,
    disabled,
    desc,
    required = true,
}: CommonFormInput<T>) => {
    const g = useTranslations();
    const ar = useArabic();
    return (
        <AKFormInput
            dir='ltr'
            className={ar ? 'text-right' : 'text-left'}
            inputType='input'
            name={'phone' as Path<T>}
            form={form}
            type='text'
            label={g('phone')}
            placeholder={'+2010xxxxxxxx'}
            maxLength={13}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
