'use client';

import { HandleLogin } from '@/api-service/data-service/AuthService';
import { FormPasswordInput } from '@/components/common-form-input/FormPasswordInput';
import { FormPhoneInput } from '@/components/common-form-input/FormPhoneNumber';
import { AKForm } from '@/components/my-components/AKForm';
import AppSettings from '@/constants/AppSettings';
import { Routes } from '@/constants/route';
import { TokenService } from '@/helpers/local-storage-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm = () => {
    const t = useTranslations();
    const param = useSearchParams();
    const phone = param.get('phone') || '';

    const { push } = useRouter();
    const schema = z.object({
        phone: z.string().min(11, { message: 'Invalid Phone Number' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    });

    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
        mode: AppSettings.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { phone, password: '' },
    });
    const login = HandleLogin();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await login.mutateAsync({ data: { dto: { ...data } } });
        if (res) {
            TokenService.accessToken.set(res.accessToken);
            TokenService.refreshToken.set(res.refreshToken);
            TokenService.phone.set(res.phone);
            TokenService.role.set(res.role);

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
