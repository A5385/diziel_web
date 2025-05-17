'use client';
import { UploadNationalImages } from '@/api-service/data-service/ProfileService';
import { AKForm } from '@/components/my-components/AKForm';
import { AKFormInput } from '@/components/my-components/AKFormInput';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { NationalIdentitySchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from './FormNavigation';
import { useUserForm } from './UserFormContext';

const NationalIdForm = ({ data }: { data?: NationalIdentitySchema | undefined }) => {
    const { setStep, profileId, role, reset } = useUserForm();
    const { handleCloseDialog } = useDialog();
    const t = useTranslations();
    const schema = useZod().fields.national;
    type FormType = z.infer<typeof schema>;

    // const createUser = UpdateProfile();

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            face: undefined,
            back: undefined,
        },
    });
    const stopStep =
        role === 'driver' || role === 'agency' || role === 'agencyAgent' || role === 'employee';
    const uploadNationalImages = UploadNationalImages();
    const submit: SubmitHandler<FormType> = async (data) => {
        if (profileId) {
            const res = await uploadNationalImages.mutateAsync({
                data: { nationalFace: data?.face, nationalBack: data?.back },
                id: profileId,
            });
            if (res) {
                if (stopStep) {
                    setStep(5);
                } else {
                    handleCloseDialog();
                    reset();
                }
            }
        }
    };
    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                submitButtonTitle={!stopStep ? 'finish' : 'next'}
                columns={2}
                actionItemPosition='end'
                title='national-id-info'
                submitButtonFullWidth
            >
                <AKFormInput
                    inputType='upload-file'
                    name={'face'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src='/avatar/national-identity-avatar.png'
                    label={t('national-id-face')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <AKFormInput
                    inputType='upload-file'
                    name={'back'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src='/avatar/national-identity-avatar.png'
                    label={t('national-id-back')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <FormNavigation show={data !== undefined} />
            </AKForm>
        </>
    );
};

export default NationalIdForm;
