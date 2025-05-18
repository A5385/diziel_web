import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import { DrugTestResultList } from '@/constants/enum-list';
import { DriverSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

const StepTwo = <T extends FieldValues>({
    form,
    driverData,
}: {
    form: UseFormReturn<T>;
    driverData?: DriverSchema | undefined;
}) => {
    const t = useTranslations();
    return (
        <>
            <AKFormInput
                inputType='upload-file'
                name={'documents.criminalRecord' as Path<T>}
                form={form}
                descStyle='text-center'
                control={form.control}
                src={driverData?.documents?.criminalRecord ?? '/document_avatar.png'}
                label={t('criminal-record')}
                shape='square-vertical'
                accept='.jpeg,.jpg,.png,web'
                required
            />
            <AKFormInput
                inputType='upload-file'
                name={'documents.drugTest.testImage' as Path<T>}
                form={form}
                descStyle='text-center'
                control={form.control}
                src={driverData?.documents?.drugTest?.testImage ?? '/document_avatar.png'}
                label={t('drug-test-image')}
                shape='square-vertical'
                accept='.jpeg,.jpg,.png,web'
                required
            />
            <AKFormInput
                form={form}
                inputType='date'
                name={'documents.drugTest.testDate' as Path<T>}
                label={t('test-date')}
            />
            <AKFormInput
                form={form}
                inputType='select'
                name={'documents.drugTest.result' as Path<T>}
                label={t('test-result')}
                selectItems={DrugTestResultList.map((test) => ({
                    label: t(test),
                    value: test,
                }))}
            />
        </>
    );
};

export default StepTwo;
