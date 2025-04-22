'use client';
import { CheckEmail } from '@/api-service/data-service/AuthService';
import { FormEmailInput } from '@/components/common-form-input/FormEmailInput';
import { AKForm } from '@/components/my-components/AKForm';
import constants from '@/constants/constants';
import { Routes } from '@/constants/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
const RegistrationForm = () => {
    const { push } = useRouter();
    const t = useTranslations();
    const schema = z.object({
        email: z.string().email().min(1, { message: 'Email is required' }),
    });
    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
        mode: constants.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { email: '' },
    });
    const emailCheck = CheckEmail();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await emailCheck.mutateAsync({ data });
        if (res) {
            if (!res.verified && !res.isPasswordSet) {
                push(`${Routes.verifyEmail.url}?email=${data.email}`);
            } else if (res.verified && !res.isPasswordSet) {
                push(`${Routes.setPassword.url}?email=${data.email}`);
            } else if (res.verified && res.isPasswordSet) {
                push(`${Routes.login.url}?email=${data.email}`);
            }
        }
    };
    return (
        <>
            {' '}
            <AKForm
                form={form}
                submit={submit}
                title={'register'}
                width='sm'
                className='w-full'
                desc={'register-desc'}
                submitButtonTitle={'register'}
                submitButtonFullWidth
            >
                <FormEmailInput form={form} />
            </AKForm>
            <Link href={Routes.registration.url} className='mt-4 text-center text-xs'>
                {t('already-have-account')}
            </Link>
        </>
    );
};

export default RegistrationForm;
