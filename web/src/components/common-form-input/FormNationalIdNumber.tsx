import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

export const FormNationalIdNumber = <T extends FieldValues>({
    form,
    span,
    disabled,
    desc,
    required = true,
}: CommonFormInput<T>) => {
    const g = useTranslations();
    return (
        <AKFormInput
            inputType='input'
            name={'nationalIdNumber' as Path<T>}
            form={form}
            type='text'
            label={g('national-id-number')}
            placeholder={g('national-id-number-ph')}
            maxLength={14}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
