'use client';
import { SetNewPassword } from '@/api-service/data-service/UserService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import { FormPhoneInput } from '@/components/my-components/form/common-form-input/FormPhoneNumber';
import SubmitButton from '@/components/my-components/form/SubmitButton';
import AppConfig from '@/constants/AppSettings';
import { Routes } from '@/constants/route';
import useZod from '@/hooks/useZod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const SetNewPasswordForm = () => {
    const t = useTranslations();

    const param = useSearchParams();
    const rawPhone = param.get('phone');
    const phoneParam = rawPhone ? `+${rawPhone.trim().replace(/^\+/, '')}` : '';

    const { push } = useRouter();

    const schema = useZod().schemas.verifyAccountSchema;

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { phone: phoneParam, newPassword: '', confirmPassword: '' },
    });
    const login = SetNewPassword();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await login.mutateAsync({ data: { ...data } });
        if (res) {
            push(Routes.login.url);
        }
    };
    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                title={'set-new-password'}
                width='sm'
                className='w-full'
                // desc={'login-desc'}
                formButtons={<SubmitButton form={form} fullWidth title='set-password' />}
                // submitButtonTitle={'login'}
                // submitButtonFullWidth
            >
                <FormPhoneInput form={form} disabled={!!phoneParam} />
                <AKFormInput
                    inputType='input'
                    name={'newPassword'}
                    form={form}
                    type='password'
                    label={t('new-password')}
                    ////
                    required
                />
                <AKFormInput
                    inputType='input'
                    name={'confirmPassword'}
                    form={form}
                    type='password'
                    label={t('confirm-password')}
                    ////
                    required
                />
            </AKForm>
            <Link
                href={Routes.login.url}
                className='mt-4 text-sm transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline'
            >
                {t('back-to-login')}
            </Link>
        </>
    );
};

export default SetNewPasswordForm;
