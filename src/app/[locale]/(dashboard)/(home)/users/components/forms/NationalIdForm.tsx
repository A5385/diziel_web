'use client';
import { UploadNationalImages } from '@/api-service/data-service/ProfileService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { ProfileSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from './FormNavigation';
import { useUserForm } from './UserFormContext';

const NationalIdForm = ({ profileData }: { profileData?: ProfileSchema | undefined }) => {
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

    console.log('🚀 >  NationalIdForm >  stopStep:', stopStep);

    const uploadNationalImages = UploadNationalImages();

    const submit: SubmitHandler<FormType> = async (data) => {
        const id = profileData?.id ?? profileId;
        if (id) {
            const res = await uploadNationalImages.mutateAsync({
                data: { nationalFace: data?.face, nationalBack: data?.back },
                id,
            });
            if (res) {
                if (stopStep) {
                    setStep(5);
                } else {
                    console.log('🚀 >  NationalIdForm >  submit > res:', res);
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
                columns={2}
                title='national-id-info'
                formButtons={
                    <FormNavigation
                        show={profileData !== undefined}
                        submitProps={{
                            fullWidth: true,
                            title: profileData ? 'update' : stopStep ? 'next' : 'finish',
                            form,
                        }}
                    />
                }
            >
                <AKFormInput
                    inputType='upload-file'
                    name={'face'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={profileData?.national?.face ?? '/avatar/national-identity-avatar.png'}
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
                    src={profileData?.national?.back ?? '/avatar/national-identity-avatar.png'}
                    label={t('national-id-back')}
                    shape='square-horizontal'
                    accept='.jpeg,.jpg,.png,web'
                    required
                />
            </AKForm>
        </>
    );
};

export default NationalIdForm;
