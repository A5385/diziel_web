import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

export const FormFullNameInput = <T extends FieldValues>({
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
            name={'fullName' as Path<T>}
            form={form}
            type='text'
            label={g('full-name')}
            placeholder={g('full-name-ph')}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
