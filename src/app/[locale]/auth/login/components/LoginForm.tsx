'use client';

import { HandleLogin } from '@/api-service/data-service/AuthService';
import { FormPasswordInput } from '@/components/common-form-input/FormPasswordInput';
import { FormPhoneInput } from '@/components/common-form-input/FormPhoneNumber';
import { AKForm } from '@/components/my-components/AKForm';
import AppConfig from '@/constants/AppSettings';
import { Routes } from '@/constants/route';
import useZod from '@/hooks/useZod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm = () => {
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
                submitButtonTitle={'login'}
                submitButtonFullWidth
            >
                <FormPhoneInput form={form} />
                <FormPasswordInput form={form} />
            </AKForm>
        </>
    );
};

export default LoginForm;
