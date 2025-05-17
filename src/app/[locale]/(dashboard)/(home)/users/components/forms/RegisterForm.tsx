'use client';
import { RegisterNewUser, UpdateUser } from '@/api-service/data-service/UserService';
import { FormPhoneInput } from '@/components/common-form-input/FormPhoneNumber';
import { AKForm } from '@/components/my-components/AKForm';
import { AKFormInput } from '@/components/my-components/AKFormInput';
import AppConfig from '@/constants/AppSettings';
import { UserRoleList } from '@/constants/enum-list';
import useZod from '@/hooks/useZod';
import { UserSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from './FormNavigation';
import { useUserForm } from './UserFormContext';

const RegisterForm = ({ data: userData }: { data?: UserSchema | undefined }) => {
    const t = useTranslations();
    const { setPhone, setStep, setRole, setNationalIdNumber, setProfileId } = useUserForm();
    const schema = useZod()?.schemas.userSchema;

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            phone: userData?.phone ?? '',
            role: userData?.role ?? 'admin',
            nationalIdNumber: userData?.profile?.national?.nationalIdNumber ?? '',
        },
    });

    const registerNewUser = RegisterNewUser();
    const updateUser = UpdateUser();

    const submit: SubmitHandler<FormType> = async (data) => {
        const res = userData
            ? await updateUser.mutateAsync({ data: { ...data }, id: userData?.id })
            : await registerNewUser.mutateAsync({ data: { ...data } });
        if (res) {
            setStep(2);
            setPhone(res?.phone);
            setRole(data?.role);
            if (res.nationalIdNumber) setNationalIdNumber(res?.nationalIdNumber);
            if (res.profileId) setProfileId(res?.profileId);
        }
    };

    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                submitButtonTitle={'next'}
                columns={3}
                actionItemPosition='end'
                title='register-user'
                submitButtonFullWidth
            >
                <FormPhoneInput form={form} />
                <AKFormInput
                    form={form}
                    inputType='select'
                    name={'role'}
                    noSearch
                    label={t('role')}
                    selectItems={UserRoleList.map((item) => ({
                        label: t(item.toLowerCase()),
                        value: item,
                    }))}
                />
                <AKFormInput
                    inputType='input'
                    name={'nationalIdNumber'}
                    form={form}
                    type='text'
                    label={t('national-id-number')}
                    placeholder={t('national-id-number-ph')}
                    maxLength={14}
                />
                <FormNavigation show={userData !== undefined} />
            </AKForm>
        </>
    );
};

export default RegisterForm;
