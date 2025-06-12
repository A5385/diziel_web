'use client';

import { VerifyOTP } from '@/api-service/data-service/UserService';
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

const VerifyOtpForm = () => {
    const t = useTranslations();

    const param = useSearchParams();
    const rawPhone = param.get('phone');
    const phoneParam = rawPhone ? `+${rawPhone.trim().replace(/^\+/, '')}` : '';

    const { push } = useRouter();
    const { phone, otp } = useZod().fields;
    const schema = z.object({ phone, otp });

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { phone: phoneParam, otp: '' },
    });
    const verifyOtp = VerifyOTP();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await verifyOtp.mutateAsync({ data: { ...data } });
        if (res) {
            push(`${Routes['set-new-password'].url}/?phone=${encodeURIComponent(data.phone)}`);
        }
    };
    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                title={'verify-phone'}
                width='sm'
                className='w-full'
                desc={'verify-phone-desc'}
                formButtons={<SubmitButton form={form} fullWidth title='verify-phone' />}
            >
                <FormPhoneInput form={form} disabled={!!phoneParam} />
                <AKFormInput form={form} name='otp' inputType='input' label='otp' />
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

export default VerifyOtpForm;
