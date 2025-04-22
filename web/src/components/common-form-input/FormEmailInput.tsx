import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { AKFormInput2 } from '../../components/my-components/AKFormInput2';

export const FormEmailInput = <T extends FieldValues>({
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
    return (
        <AKFormInput2
            inputType='input'
            name={'email' as Path<T>}
            form={form}
            type='text'
            label={g('email')}
            placeholder={g('email-ph')}
            required
            disabled={disabled}
            span={span}
            desc={desc}
        />
    );
};
