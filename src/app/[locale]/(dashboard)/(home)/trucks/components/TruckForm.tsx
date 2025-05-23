import {
    CreateTruck,
    UpdateTruck,
    UploadTruckImage,
    UploadTruckLicense,
} from '@/api-service/data-service/TruckService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import SubmitButton from '@/components/my-components/form/SubmitButton';
import GridWrapper from '@/components/my-components/GridWrapper';
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
            truckImage: { front: undefined, back: undefined, left: undefined, right: undefined },
            licenseImage: { face: undefined, back: undefined },
        },
    });

    const createTruck = CreateTruck();
    const updateTruck = UpdateTruck();

    const uploadLicenseImage = UploadTruckLicense();
    const uploadTruckImages = UploadTruckImage();

    const submit: SubmitHandler<FormType> = async ({ truckImage, licenseImage, ...data }) => {
        const res =
            dialogType === 'new-truck'
                ? await createTruck.mutateAsync({ data: { ...data } })
                : await updateTruck.mutateAsync({
                      data: { ...data },
                      id: editItemId ?? '',
                  });

        if (res) {
            if (truckImage) {
                const front = truckImage?.front,
                    back = truckImage?.back,
                    left = truckImage?.left,
                    right = truckImage?.right;

                if (front || back || left || right) {
                    await uploadTruckImages?.mutateAsync({
                        data: {
                            ...(front && { frontImage: front }),
                            ...(back && { backImage: back }),
                            ...(left && { leftImage: left }),
                            ...(right && { rightImage: right }),
                        },
                        id: res?.id,
                    });
                }
            }
            if (licenseImage) {
                const face = licenseImage?.face,
                    back = licenseImage?.back;

                if (face || back) {
                    await uploadLicenseImage?.mutateAsync({
                        data: {
                            ...(face && { licenseFace: face }),
                            ...(back && { licenseBack: back }),
                        },
                        id: res?.id,
                    });
                }
            }
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
            <GridWrapper cols={4} className='col-span-3'>
                <AKFormInput
                    inputType='upload-file'
                    name={'truckImage.front'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTruck?.images?.front ?? '/avatar/truck/front.jpg'}
                    label={t('front-image')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <AKFormInput
                    inputType='upload-file'
                    name={'truckImage.back'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTruck?.images?.back ?? '/avatar/truck/back.jpg'}
                    label={t('back-image')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <AKFormInput
                    inputType='upload-file'
                    name={'truckImage.left'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTruck?.images?.left ?? '/avatar/truck/left.jpg'}
                    label={t('left-image')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <AKFormInput
                    inputType='upload-file'
                    name={'truckImage.right'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTruck?.images?.right ?? '/avatar/truck/right.jpg'}
                    label={t('right-image')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
            </GridWrapper>
            <GridWrapper cols={2} className='col-span-3'>
                <AKFormInput
                    inputType='upload-file'
                    name={'licenseImage.face'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTruck?.license?.face ?? '/avatar/license_avatar.jpg'}
                    label={t('license-face')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <AKFormInput
                    inputType='upload-file'
                    name={'licenseImage.back'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTruck?.license?.back ?? '/avatar/license_avatar.jpg'}
                    label={t('license-back')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
            </GridWrapper>
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
