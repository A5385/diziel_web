import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import GridWrapper from '@/components/my-components/GridWrapper';
import { DriverLicenseTypeList } from '@/constants/enum-list';
import { DriverSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

const StepThree = <T extends FieldValues>({
    form,
    driverData,
}: {
    form: UseFormReturn<T>;
    driverData?: DriverSchema | undefined;
}) => {
    const t = useTranslations();
    return (
        <>
            <GridWrapper cols={3} className='col-span-2'>
                <AKFormInput
                    form={form}
                    inputType='input'
                    name={'documents.license.number' as Path<T>}
                    label={t('license-number')}
                />
                <AKFormInput
                    form={form}
                    inputType='select'
                    label={t('license-type')}
                    noSearch
                    name={'documents.license.type' as Path<T>}
                    selectItems={DriverLicenseTypeList.map((type) => ({
                        label: t(type),
                        value: type,
                    }))}
                />
                <AKFormInput
                    form={form}
                    inputType='input'
                    name={'documents.license.traffic_unit' as Path<T>}
                    label={t('traffic-unit')}
                />
            </GridWrapper>

            <AKFormInput
                inputType='upload-file'
                name={'documents.license.face' as Path<T>}
                form={form}
                descStyle='text-center'
                control={form.control}
                src={driverData?.documents?.license?.face ?? '/avatar/license_avatar.jpg'}
                label={t('license-face')}
                shape='square-horizontal'
                accept='.jpeg,.jpg,.png,web'
                required
            />
            <AKFormInput
                inputType='upload-file'
                name={'documents.license.back' as Path<T>}
                form={form}
                descStyle='text-center'
                control={form.control}
                src={driverData?.documents?.license?.back ?? '/avatar/license_avatar.jpg'}
                label={t('license-back')}
                shape='square-horizontal'
                accept='.jpeg,.jpg,.png,web'
                required
            />

            <AKFormInput
                form={form}
                inputType='date'
                name={'documents.license.startDate' as Path<T>}
                label={t('start-date')}
            />
            <AKFormInput
                form={form}
                inputType='date'
                name={'documents.license.endDate' as Path<T>}
                label={t('end-date')}
            />
        </>
    );
};

export default StepThree;
