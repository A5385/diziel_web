import { RegisterNewUser } from '@/api-service/data-service/UserService';
import { FormNationalIdNumber } from '@/components/common-form-input/FormNationalIdNumber';
import { FormPhoneInput } from '@/components/common-form-input/FormPhoneNumber';
import FormRoleInput from '@/components/common-form-input/FormRoleInput';
import { AKForm } from '@/components/my-components/AKForm';
import AppSettings from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserForm } from './UserFormContext';

const RegisterForm = () => {
    const { setPhone, setStep, setRole, setNationalIdNumber, setProfileId } = useUserForm();
    const schema = useZod()?.schemas.userSchema;

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppSettings.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            phone: '',
            role: 'admin',
            nationalIdNumber: '',
        },
    });

    const registerNewUser = RegisterNewUser();

    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await registerNewUser.mutateAsync({ data: { dto: { ...data } } });
        if (res) {
            setStep(2);
            setPhone(res?.phone);
            setRole(data?.role);
            if (res.nationalIdNumber) setNationalIdNumber(res?.nationalIdNumber);
            if (res.profileId) setProfileId(res?.profileId);
        }
    };

    return (
        <>
            <AKForm
                form={form}
                submit={submit}
                submitButtonTitle={'next'}
                columns={2}
                actionItemPosition='end'
                title='register-user'
                submitButtonFullWidth
            >
                <FormPhoneInput form={form} />
                <FormRoleInput form={form} />
                <FormNationalIdNumber form={form} span={2} />
            </AKForm>
        </>
    );
};

export default RegisterForm;
