import { CreateUser } from '@/api-service/data-service/UserService';
import { FormPhoneInput } from '@/components/common-form-input/FormPhoneNumber';
import FormRoleInput from '@/components/common-form-input/FormRoleInput';
import { AKForm } from '@/components/my-components/AKForm';
import AppSettings from '@/constants/AppSettings';
import { useDialog } from '@/providers/DialogProvider';
import { UserRole } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type UserFormProps = {
    data?: UserSchema;
};

const UserForm = ({ data }: UserFormProps) => {
    const g = useTranslations();
    const t = useTranslations('dashboard');

    const { handleCloseDialog, dialogType, editItemId } = useDialog();
    const schema = z.object({
        phone: z
            .string()
            .regex(
                /^(?:\+20|0)?(10|11|12|15)\d{8}$/,
                'Phone number must be a valid Egyptian mobile number (e.g., 01012345678 or +201012345678)',
            ),
        role: z.nativeEnum(UserRole),
    });

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppSettings.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            phone: data?.phone ?? '',
            ...(dialogType === 'new-user' && { password: '', confirmPassword: '' }),
            role: data?.role ?? 'admin',
        },
    });

    const createUser = CreateUser();
    // const updateUser = UpdateUser();
    const submit: SubmitHandler<FormType> = async (data) => {
        const res = await createUser.mutateAsync({ data: { dto: { ...data } } });
        if (res) {
            handleCloseDialog();
            form.reset();
        }
    };

    return (
        <AKForm
            form={form}
            submit={submit}
            actionItemPosition='end'
            submitButtonTitle={'save'}
            columns={3}
        >
            <FormPhoneInput form={form} />
            <FormRoleInput form={form} />
        </AKForm>
    );
};

export default UserForm;
