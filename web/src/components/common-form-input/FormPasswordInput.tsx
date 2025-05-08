import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

export const FormPasswordInput = <T extends FieldValues>({
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
            name={'password' as Path<T>}
            form={form}
            type='password'
            label={g('password')}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
export const FormConfirmPasswordInput = <T extends FieldValues>({
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
            name={'confirmPassword' as Path<T>}
            form={form}
            type='password'
            label={g('confirm-password')}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
export const FormOldPasswordInput = <T extends FieldValues>({
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
            name={'oldPassword' as Path<T>}
            form={form}
            type='password'
            label={g('old-password')}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};
