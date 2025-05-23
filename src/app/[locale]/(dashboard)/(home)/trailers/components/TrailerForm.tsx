import {
    CreateTrailer,
    UpdateTrailer,
    UploadTrailerImage,
    UploadTrailerLicense,
} from '@/api-service/data-service/TrailerService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import SubmitButton from '@/components/my-components/form/SubmitButton';
import GridWrapper from '@/components/my-components/GridWrapper';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { TrailerSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type TruckFormProps = {
    editTrailer?: TrailerSchema;
};

const TrailerForm = ({ editTrailer }: TruckFormProps) => {
    const t = useTranslations();
    const schema = useZod().schemas.trailerSchema;
    const { handleCloseDialog, dialogType, editItemId } = useDialog();

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            plateNumber: editTrailer?.plateNumber ?? '',
            type: editTrailer?.type ?? '',
            brand: editTrailer?.brand ?? '',
            axleCount: editTrailer?.axleCount ?? 0,
            modelYear: editTrailer?.modelYear ?? 0,
            cargoType: editTrailer?.cargoType ?? '',
            maxLoad: editTrailer?.maxLoad ?? 0,
            safetyEquipment: editTrailer?.safetyEquipment ?? '',
            chassisNumber: editTrailer?.chassisNumber ?? '',
            licenseNumber: editTrailer?.license?.number ?? '',
            truckImage: { front: undefined, back: undefined, left: undefined, right: undefined },
            licenseImage: { face: undefined, back: undefined },
        },
    });

    const createTrailer = CreateTrailer();
    const updateTrailer = UpdateTrailer();

    const uploadLicenseImage = UploadTrailerLicense();
    const uploadTrailerImages = UploadTrailerImage();

    const submit: SubmitHandler<FormType> = async ({ truckImage, licenseImage, ...data }) => {
        const res =
            dialogType === 'new-trailer'
                ? await createTrailer.mutateAsync({ data: { ...data } })
                : await updateTrailer.mutateAsync({
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
                    await uploadTrailerImages?.mutateAsync({
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
                <SubmitButton form={form} title={editTrailer ? 'update' : 'create'} fullWidth />
            }
        >
            <GridWrapper cols={4} className='col-span-3'>
                <AKFormInput
                    inputType='upload-file'
                    name={'truckImage.front'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={editTrailer?.images?.front ?? '/avatar/truck/front.jpg'}
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
                    src={editTrailer?.images?.back ?? '/avatar/truck/back.jpg'}
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
                    src={editTrailer?.images?.left ?? '/avatar/truck/left.jpg'}
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
                    src={editTrailer?.images?.right ?? '/avatar/truck/right.jpg'}
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
                    src={editTrailer?.license?.face ?? '/avatar/license_avatar.jpg'}
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
                    src={editTrailer?.license?.back ?? '/avatar/license_avatar.jpg'}
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

export default TrailerForm;
