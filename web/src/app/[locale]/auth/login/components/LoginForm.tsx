'use client';

import { HandleLogin } from '@/api-service/data-service/AuthService';
import { FormEmailInput } from '@/components/common-form-input/FormEmailInput';
import { FormPasswordInput } from '@/components/common-form-input/FormPasswordInput';
import { AKForm } from '@/components/my-components/AKForm';
import constants from '@/constants/constants';
import { Routes } from '@/constants/route';
import { TokenService } from '@/helpers/local-storage-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm = () => {
    const t = useTranslations();
    const param = useSearchParams();
    const email = param.get('email') || '';
    const { push } = useRouter();
    const schema = z.object({
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    });

    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
        mode: constants.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { email, password: '' },
    });
    const login = HandleLogin();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await login.mutateAsync({ data: { dto: { ...data } } });
        console.log('🚀 >  constsubmit:SubmitHandler<FormType>= >  res:', res);
        if (res) {
            TokenService.accessToken.set(res.accessToken);
            TokenService.refreshToken.set(res.refreshToken);
            TokenService.email.set(res.email);

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
                <FormEmailInput form={form} />
                <FormPasswordInput form={form} />
            </AKForm>
            <Link href={Routes.registration.url} className='mt-4 text-center text-xs'>
                {t('go-to-register')}
            </Link>
        </>
    );
};

export default LoginForm;
