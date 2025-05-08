'use client';
import { UploadNationalImages } from '@/api-service/data-service/ProfileService';
import { AKForm } from '@/components/my-components/AKForm';
import { AKFormInput } from '@/components/my-components/AKFormInput';
import AppSettings from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserForm } from './UserFormContext';

const NationalIdForm = () => {
    const { setStep, profileId, role, reset } = useUserForm();
    const { handleCloseDialog } = useDialog();
    const t = useTranslations();
    const schema = useZod().fields.national;
    type FormType = z.infer<typeof schema>;

    // const createUser = UpdateProfile();

    const form = useForm<FormType>({
        mode: AppSettings.form.mode,
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
                    src='/national-identity-avatar.png'
                    label={t('national-id-face')}
                    shape='square'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
                <AKFormInput
                    inputType='upload-file'
                    name={'back'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src='/national-identity-avatar.png'
                    label={t('national-id-back')}
                    shape='square'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
            </AKForm>
        </>
    );
};

export default NationalIdForm;
