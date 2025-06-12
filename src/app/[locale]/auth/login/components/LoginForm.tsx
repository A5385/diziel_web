'use client';

import { HandleLogin } from '@/api-service/data-service/AuthService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { FormPasswordInput } from '@/components/my-components/form/common-form-input/FormPasswordInput';
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

const LoginForm = () => {
    const t = useTranslations();
    const param = useSearchParams();
    const phoneParam = param.get('phone') || '';
    const { push } = useRouter();

    const schema = useZod().schemas.loginSchema;

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { phone: phoneParam ?? '', password: '' },
    });
    const login = HandleLogin();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await login.mutateAsync({ data: { ...data } });
        if (res) {
            push(Routes.dashboard.url);
        }
    };
    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                title={'login'}
                width='sm'
                className='w-full'
                desc={'login-desc'}
                formButtons={<SubmitButton form={form} fullWidth title='login' />}
                // submitButtonTitle={'login'}
                // submitButtonFullWidth
            >
                <FormPhoneInput form={form} />
                <FormPasswordInput form={form} />
            </AKForm>
            <Link
                href={Routes['verify-account'].url}
                className='mt-4 text-sm transition-all duration-300 ease-in-out hover:text-blue-500 hover:underline'
            >
                {t('verify-account')}
            </Link>
        </>
    );
};

export default LoginForm;
