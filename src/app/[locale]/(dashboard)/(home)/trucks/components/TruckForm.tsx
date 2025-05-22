import { CreateTruck, UpdateTruck } from '@/api-service/data-service/TruckService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import SubmitButton from '@/components/my-components/form/SubmitButton';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { TruckSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type TruckFormProps = {
    editTruck?: TruckSchema;
};

const TruckForm = ({ editTruck }: TruckFormProps) => {
    const t = useTranslations();
    const schema = useZod().schemas.truckSchema;
    const { handleCloseDialog, dialogType, editItemId } = useDialog();

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            plateNumber: editTruck?.plateNumber ?? '',
            type: editTruck?.type ?? '',
            brand: editTruck?.brand ?? '',
            axleCount: editTruck?.axleCount ?? 0,
            modelYear: editTruck?.modelYear ?? 0,
            cargoType: editTruck?.cargoType ?? '',
            maxLoad: editTruck?.maxLoad ?? 0,
            safetyEquipment: editTruck?.safetyEquipment ?? '',
            chassisNumber: editTruck?.chassisNumber ?? '',
            engineNumber: editTruck?.engineNumber ?? '',
            licenseNumber: editTruck?.license?.number ?? '',
        },
    });

    const createTruck = CreateTruck();
    const updateTruck = UpdateTruck();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res =
            dialogType === 'new-truck'
                ? await createTruck.mutateAsync({ data: { ...data } })
                : await updateTruck.mutateAsync({
                      data: { ...data },
                      id: editItemId ?? '',
                  });

        if (res) {
            handleCloseDialog();
            form.reset();
        }
    };

    return (
        <AKForm
            form={form}
            submit={submit}
            columns={3}
            formButtons={
                <SubmitButton form={form} title={editTruck ? 'update' : 'create'} fullWidth />
            }
        >
            <AKFormInput
                form={form}
                name='plateNumber'
                inputType='input'
                label={t('plate-number')}
                placeholder={t('plate-number-ph')}
            />
            <AKFormInput
                form={form}
                name='chassisNumber'
                inputType='input'
                label={t('chassis-number')}
                placeholder={t('chassis-number-ph')}
            />
            <AKFormInput
                form={form}
                name='engineNumber'
                inputType='input'
                label={t('engine-number')}
                placeholder={t('engine-number-ph')}
            />
            <AKFormInput
                form={form}
                name='licenseNumber'
                inputType='input'
                label={t('license-number')}
                placeholder={t('license-number-ph')}
            />
            <AKFormInput
                form={form}
                name='type'
                inputType='input'
                label={t('type')}
                placeholder={t('type-ph')}
            />
            <AKFormInput
                form={form}
                name='brand'
                inputType='input'
                label={t('brand')}
                placeholder={t('brand-ph')}
            />
            <AKFormInput
                form={form}
                name='axleCount'
                inputType='input'
                label={t('axle-count')}
                type='number'
            />
            <AKFormInput
                form={form}
                name='modelYear'
                inputType='input'
                label={t('model-year')}
                type='number'
            />
            <AKFormInput
                form={form}
                name='cargoType'
                inputType='input'
                label={t('cargo-type')}
                placeholder={t('cargo-type-ph')}
            />
            <AKFormInput
                form={form}
                name='maxLoad'
                inputType='input'
                label={t('max-load')}
                type='number'
            />
            <AKFormInput
                form={form}
                name='safetyEquipment'
                inputType='input'
                label={t('safety-equipment')}
                placeholder={t('safety-equipment-ph')}
            />
        </AKForm>
    );
};

export default TruckForm;
