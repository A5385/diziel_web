import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

const FormImageInput = <T extends FieldValues>({
    form,
    span,
    disabled,
    desc,
    required,
}: CommonFormInput<T>) => {
    const t = useTranslations();

    return (
        <AKFormInput
            inputType='upload-file'
            name={'image' as Path<T>}
            form={form}
            // desc={t('recommended-size')}
            descStyle='text-center'
            // formFieldStyle='!w-fit'
            control={form.control}
            src={'/avatar.png'}
            label={t('image')}
            shape='square'
            accept='.jpeg,.jpg,.png,web'
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};

export default FormImageInput;
