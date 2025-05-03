import { roleList } from '@/app/[locale]/(dashboard)/(home)/users/components/role-list';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { AKFormInput2 } from '../my-components/AKFormInput2';

const FormRoleInput = <T extends FieldValues>({ form }: { form: UseFormReturn<T> }) => {
    const t = useTranslations();
    return (
        <AKFormInput2
            form={form}
            inputType='select'
            name={'role' as Path<T>}
            noSearch
            label={t('role')}
            selectItems={roleList.map((item) => ({
                label: t(item.toLowerCase()),
                value: item,
            }))}
        />
    );
};

export default FormRoleInput;
