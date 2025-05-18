import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import { DriverGradeList, DriverTypeList } from '@/constants/enum-list';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

const StepOne = <T extends FieldValues>({ form }: { form: UseFormReturn<T> }) => {
    const t = useTranslations();
    return (
        <>
            <AKFormInput
                form={form}
                inputType='select'
                label={t('driver-type')}
                name={'driverType' as Path<T>}
                selectItems={DriverTypeList.map((type) => ({
                    label: t(type),
                    value: type,
                }))}
            />
            <AKFormInput
                form={form}
                inputType='select'
                label={t('driver-grade')}
                name={'grade' as Path<T>}
                selectItems={DriverGradeList.map((grade) => ({
                    label: t(grade),
                    value: grade,
                }))}
            />
        </>
    );
};

export default StepOne;
