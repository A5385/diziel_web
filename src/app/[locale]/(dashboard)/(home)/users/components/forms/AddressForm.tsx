'use client';
import { UpdateProfileAddress } from '@/api-service/data-service/ProfileService';
import { AKForm } from '@/components/my-components/AKForm';
import { AKFormInput } from '@/components/my-components/AKFormInput';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { AddressSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from './FormNavigation';
import { useUserForm } from './UserFormContext';

const AddressForm = ({ data }: { data?: AddressSchema | undefined }) => {
    const t = useTranslations();
    const { setStep, profileId } = useUserForm();
    const schema = useZod().fields.address;
    type FormType = z.infer<typeof schema>;

    // const createUser = UpdateProfile();

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            line1: '',
            line2: '',
            country: '',
            city: '',
            state: '',
        },
    });

    const updateAddress = UpdateProfileAddress();

    const submit: SubmitHandler<FormType> = async (data) => {
        if (profileId) {
            const res = await updateAddress.mutateAsync({
                data: { ...data },
                id: profileId,
            });
            if (res) {
                setStep(4);
            }
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
                title='address-info'
                className='w-full'
                submitButtonFullWidth
            >
                <AKFormInput
                    form={form}
                    inputType='text-area'
                    name='line1'
                    label={t('line1')}
                    required
                    span={3}
                />
                <AKFormInput
                    form={form}
                    inputType='text-area'
                    name='line2'
                    label={t('line2')}
                    span={3}
                />
                <AKFormInput form={form} inputType='input' name='country' label={t('country')} />
                <AKFormInput form={form} inputType='input' name='city' label={t('city')} />
                <AKFormInput form={form} inputType='input' name='state' label={t('state')} />
                <FormNavigation show={data !== undefined} />
            </AKForm>
        </>
    );
};

export default AddressForm;
