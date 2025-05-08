import { roleList } from '@/app/[locale]/(dashboard)/(home)/users/components/role-list';
import { useTranslations } from 'next-intl';
import { FieldValues, Path } from 'react-hook-form';
import { AKFormInput } from '../my-components/AKFormInput';
import { CommonFormInput } from './type';

const FormRoleInput = <T extends FieldValues>({
    form,
    span,
    disabled,
    desc,
    required = true,
}: CommonFormInput<T>) => {
    const t = useTranslations();
    return (
        <AKFormInput
            form={form}
            inputType='select'
            name={'role' as Path<T>}
            noSearch
            label={t('role')}
            selectItems={roleList.map((item) => ({
                label: t(item.toLowerCase()),
                value: item,
            }))}
            ////
            required={required}
            desc={desc}
            span={span}
            disabled={disabled}
        />
    );
};

export default FormRoleInput;
