'use client';

import { CreateAgency, UpdateAgency } from '@/api-service/data-service/AgencyServcice';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { AgencySchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from './FormNavigation';
import { useUserForm } from './UserFormContext';

const AgencyForm = ({ agencyData }: { agencyData?: AgencySchema | undefined }) => {
    const t = useTranslations();
    const { profileId } = useUserForm();
    const { handleCloseDialog } = useDialog();
    const schema = useZod().schemas.agencySchema;

    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            name: agencyData?.name ?? '',
            registrationRecord: agencyData?.registrationRecord ?? '',
            phone1: agencyData?.phone1 ?? '',
            phone2: agencyData?.phone2 ?? '',
            phone3: agencyData?.phone3 ?? '',
            email: agencyData?.email ?? '',
        },
    });

    const createAgency = CreateAgency();
    const updateAgency = UpdateAgency();

    const submit: SubmitHandler<FormType> = async (data) => {
        if (profileId) {
            const res = agencyData
                ? await updateAgency.mutateAsync({ data: { ...data }, id: agencyData.id })
                : await createAgency.mutateAsync({ data: { ...data, profileId } });

            if (res) {
                handleCloseDialog();
            }
        }
    };
    return (
        <AKForm
            form={form}
            submit={submit}
            columns={2}
            title={agencyData ? 'update' : 'create'}
            formButtons={
                <div className='flex w-full flex-col gap-4'>
                    <FormNavigation
                        show={agencyData !== undefined}
                        submitProps={{
                            fullWidth: true,
                            title: agencyData ? 'update' : 'save',
                            form,
                        }}
                    />
                </div>
            }
        >
            <AKFormInput
                form={form}
                name='name'
                inputType='input'
                label={t('agency-name')}
                placeholder={t('agency-name-ph')}
                required
            />
            <AKFormInput
                form={form}
                name='registrationRecord'
                inputType='input'
                label={t('registration-record')}
                placeholder={t('registration-record-ph')}
            />
            <AKFormInput
                form={form}
                name='phone1'
                inputType='input'
                label={t('phone1')}
                placeholder={t('phone1-ph')}
            />
            <AKFormInput
                form={form}
                name='phone2'
                inputType='input'
                label={t('phone2')}
                placeholder={t('phone2-ph')}
            />
            <AKFormInput
                form={form}
                name='phone3'
                inputType='input'
                label={t('phone3')}
                placeholder={t('phone3-ph')}
            />
            <AKFormInput
                form={form}
                name='email'
                inputType='input'
                label={t('email')}
                placeholder={t('email-ph')}
            />
        </AKForm>
    );
};

export default AgencyForm;
