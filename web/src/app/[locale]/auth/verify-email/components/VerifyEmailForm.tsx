'use client';
import { VerifyOtp } from '@/api-service/data-service/UserService';
import { AKForm } from '@/components/my-components/AKForm';
import { AKFormInput2 } from '@/components/my-components/AKFormInput2';
import constants from '@/constants/constants';
import { Routes } from '@/constants/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
const VerifyEmailForm = () => {
    const t = useTranslations();
    const { push } = useRouter();
    const param = useSearchParams();
    const email = param.get('email') ?? '';
    const schema = z.object({
        otp: z.string().min(4, { message: 'OTP is required' }),
    });
    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
        mode: constants.form.mode,
        resolver: zodResolver(schema),
        defaultValues: { otp: '' },
    });
    const verifyOtp = VerifyOtp();
    const submit: SubmitHandler<FormType> = async (data) => {
        if (!email) return;
        else {
            const res = await verifyOtp.mutateAsync({ data: { dto: { ...data, email } } });
            if (res) {
                push(`${Routes.setPassword.url}?email=${email}`);
            }
        }
    };
    return (
        <AKForm
            form={form}
            submit={submit}
            title={'otp'}
            width='sm'
            className='w-full'
            desc={'otp-desc'}
            submitButtonTitle={'verify-email'}
            submitButtonFullWidth
        >
            <AKFormInput2 name='otp' form={form} label={t('otp')} inputType='input' />
        </AKForm>
    );
};

export default VerifyEmailForm;
