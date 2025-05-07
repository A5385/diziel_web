'use client';

import { UpdateProfile, UploadProfileImage } from '@/api-service/data-service/ProfileService';
import { FormEmailInput } from '@/components/common-form-input/FormEmailInput';
import { FormFullNameInput } from '@/components/common-form-input/FormFullNameInput';
import FormImageInput from '@/components/common-form-input/FormImageInput';
import { FormNicknameInput } from '@/components/common-form-input/FormNicknameInput';
import { AKForm } from '@/components/my-components/AKForm';
import AppSettings from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserForm } from './UserFormContext';

const ProfileForm = () => {
    const { setStep, profileId } = useUserForm();
    const schema = useZod().schemas.profileSchema;
    type FormType = z.infer<typeof schema>;

    // const createUser = UpdateProfile();

    const form = useForm<FormType>({
        mode: AppSettings.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            fullName: '',
            nickname: '',
            image: undefined,
        },
    });

    const updateProfile = UpdateProfile();
    const uploadProfileImage = UploadProfileImage();

    const submit: SubmitHandler<FormType> = async ({ image, ...data }) => {
        if (profileId) {
            const res = await updateProfile.mutateAsync({
                data: { dto: { ...data } },
                id: profileId,
            });

            const upload = await uploadProfileImage.mutateAsync({
                data: { file: image },
                id: profileId,
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
                submitButtonTitle={'next'}
                columns={1}
                actionItemPosition='end'
                title='profile-info'
                submitButtonFullWidth
            >
                <FormImageInput form={form} />
                <FormEmailInput form={form} />
                <FormFullNameInput form={form} />
                <FormNicknameInput form={form} />
            </AKForm>
        </>
    );
};

export default ProfileForm;
