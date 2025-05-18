'use client';

import { UpdateProfile, UploadProfileImage } from '@/api-service/data-service/ProfileService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { ProfileSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from './FormNavigation';
import { useUserForm } from './UserFormContext';

const ProfileForm = ({ profileData }: { profileData?: ProfileSchema | undefined }) => {
    const t = useTranslations();
    const { setStep, profileId } = useUserForm();
    const schema = useZod().schemas.profileSchema;
    type FormType = z.infer<typeof schema>;

    // const createUser = UpdateProfile();

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            email: profileData?.email ?? '',
            fullName: profileData?.fullName ?? '',
            nickname: profileData?.nickname ?? '',
            image: undefined,
        },
    });
    // console.log('🚀 >  ProfileForm >  form:', form.getValues());

    const updateProfile = UpdateProfile();
    const uploadProfileImage = UploadProfileImage();

    const submit: SubmitHandler<FormType> = async ({ image, ...data }) => {
        const id = profileData?.id ?? profileId;
        if (id) {
            const res = await updateProfile.mutateAsync({
                data: { ...data },
                id,
            });

            const upload = await uploadProfileImage.mutateAsync({
                data: { file: image },
                id,
            });

            if (res || upload) {
                setStep(3);
            }
        }
    };
    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                columns={3}
                title='profile-info'
                formButtons={
                    <FormNavigation
                        show={profileData !== undefined}
                        submitProps={{
                            fullWidth: true,
                            title: profileData ? 'update' : 'next',
                            form,
                        }}
                    />
                }
            >
                <AKFormInput
                    inputType='upload-file'
                    name={'image'}
                    form={form}
                    descStyle='text-center'
                    control={form.control}
                    src={profileData?.image ?? '/avatar/avatar.png'}
                    label={t('image')}
                    shape='circle'
                    accept='.jpeg,.jpg,.png,web'
                    span={3}
                />
                <AKFormInput
                    inputType='input'
                    name={'email'}
                    form={form}
                    type='text'
                    label={t('email')}
                    placeholder={t('email-ph')}
                />
                <AKFormInput
                    inputType='input'
                    name={'fullName'}
                    form={form}
                    type='text'
                    label={t('full-name')}
                    placeholder={t('full-name-ph')}
                />
                <AKFormInput
                    inputType='input'
                    name={'nickname'}
                    form={form}
                    type='text'
                    label={t('nickname')}
                    placeholder={t('nickname-ph')}
                />
            </AKForm>
        </>
    );
};

export default ProfileForm;
