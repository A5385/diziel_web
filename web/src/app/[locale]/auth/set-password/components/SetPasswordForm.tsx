'use client';
import { SetPassword } from '@/api-service/data-service/UserService';
import {
    FormConfirmPasswordInput,
    FormPasswordInput,
} from '@/components/common-form-input/FormPasswordInput';
import { AKForm } from '@/components/my-components/AKForm';
import { FormCriteria } from '@/components/password-component/FormCriteria';
import { GeneratePasswordButton } from '@/components/password-component/GeneratePasswordButton';
import { PasswordStrengthBar } from '@/components/password-component/PasswordStrengthBar';
import constants from '@/constants/constants';
import { Routes } from '@/constants/route';
import { useCheckCriteria } from '@/hooks/useCheckCriteria';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const SetPasswordForm = () => {
    const t = useTranslations();
    const param = useSearchParams();
    const email = param.get('email') ?? '';
    const { push } = useRouter();
    const Schema = z
        .object({
            password: z.string().min(8, { message: t('length') }),
            confirmPassword: z.string(),
        })
        .superRefine((data, ctx) => {
            if (data.password !== data.confirmPassword) {
                ctx.addIssue({
                    path: ['confirmPassword'],
                    code: 'custom',
                    message: t('password-not-match'),
                });
            }
        });

    type FormType = z.infer<typeof Schema>;

    const defaultValues: FormType = {
        password: '',
        confirmPassword: '',
    };

    const form = useForm<FormType>({
        mode: constants.form.mode,
        resolver: zodResolver(Schema),
        defaultValues,
    });

    const watchPassword = useWatch({
        control: form.control,
        name: 'password',
    });
    const watchConfirmPassword = useWatch({
        control: form.control,
        name: 'confirmPassword',
    });
    const showCheckMark =
        watchPassword !== '' &&
        watchConfirmPassword !== '' &&
        watchPassword === watchConfirmPassword;

    const { passwordStrength, missingCriteria } = useCheckCriteria(watchPassword);

    const setPassword = SetPassword();
    const submit: SubmitHandler<FormType> = async (data) => {
        const { password, confirmPassword } = data;
        if (passwordStrength !== 'Very Strong') {
            toast.error(t('password-not-strong'));
        } else if (password !== confirmPassword) {
            toast.error(t('password-not-match'));
        } else {
            const res = await setPassword.mutateAsync({
                data: {
                    dto: {
                        password,
                        email,
                    },
                },
            });
            if (res) {
                push(`${Routes.login.url}?email=${email}`);
            }
        }
    };

    return (
        <AKForm
            form={form}
            submit={submit}
            title={'set-password'}
            width='sm'
            className='w-full'
            desc={'set-password-desc'}
            submitButtonTitle={'set-password'}
            submitButtonFullWidth
        >
            <div>
                <FormPasswordInput form={form} />

                {passwordStrength !== '' && (
                    <PasswordStrengthBar passwordStrength={passwordStrength} />
                )}
            </div>

            <div className='flex items-end gap-4'>
                <FormConfirmPasswordInput form={form} />

                {showCheckMark && (
                    <div className='mb-2 flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-green-500 p-1'>
                        <CheckIcon color='white' />
                    </div>
                )}
            </div>
            <GeneratePasswordButton reset={form.reset} password={watchPassword} />
            <FormCriteria missingCriteria={missingCriteria} />
        </AKForm>
    );
};

export default SetPasswordForm;
