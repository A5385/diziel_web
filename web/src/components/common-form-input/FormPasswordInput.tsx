import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { AKFormInput2 } from '../../components/my-components/AKFormInput2';

export const FormPasswordInput = <T extends FieldValues>({ form }: { form: UseFormReturn<T> }) => {
    const g = useTranslations();
    return (
        <AKFormInput2
            inputType='input'
            name={'password' as Path<T>}
            form={form}
            type='password'
            label={g('password')}
        />
    );
};
export const FormConfirmPasswordInput = <T extends FieldValues>({
    form,
}: {
    form: UseFormReturn<T>;
}) => {
    const g = useTranslations();
    return (
        <AKFormInput2
            inputType='input'
            name={'confirmPassword' as Path<T>}
            form={form}
            type='password'
            label={g('confirm-password')}
        />
    );
};
export const FormOldPasswordInput = <T extends FieldValues>({
    form,
}: {
    form: UseFormReturn<T>;
}) => {
    const g = useTranslations();
    return (
        <AKFormInput2
            inputType='input'
            name={'oldPassword' as Path<T>}
            form={form}
            type='password'
            label={g('old-password')}
        />
    );
};
