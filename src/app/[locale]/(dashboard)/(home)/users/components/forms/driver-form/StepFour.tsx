import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import { DriverSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

const StepFour = <T extends FieldValues>({
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
                form={form}
                inputType='input'
                name={'documents.passport.number' as Path<T>}
                label={t('passport-number')}
                span={2}
            />
            <AKFormInput
                inputType='upload-file'
                name={'documents.passport.face' as Path<T>}
                form={form}
                descStyle='text-center'
                control={form.control}
                src={driverData?.documents?.passport?.face ?? '/document_avatar.png'}
                label={t('passport-face')}
                shape='square-vertical'
                accept='.jpeg,.jpg,.png,web'
                required
            />
            <AKFormInput
                inputType='upload-file'
                name={'documents.passport.back' as Path<T>}
                form={form}
                descStyle='text-center'
                control={form.control}
                src={driverData?.documents?.passport?.back ?? '/document_avatar.png'}
                label={t('passport-back')}
                shape='square-vertical'
                accept='.jpeg,.jpg,.png,web'
                required
            />
        </>
    );
};

export default StepFour;
