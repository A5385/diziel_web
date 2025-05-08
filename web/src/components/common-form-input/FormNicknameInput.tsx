import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

export const FormNicknameInput = <T extends FieldValues>({
    form,
    span,
    disabled,
    desc,
    required,
}: CommonFormInput<T>) => {
    const g = useTranslations();
    return (
        <AKFormInput
            inputType='input'
            name={'nickname' as Path<T>}
            form={form}
            type='text'
            label={g('nickname')}
            placeholder={g('nickname-ph')}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
