import { FormEmailInput } from '@/components/common-form-input/FormEmailInput';
import { FormFullNameInput } from '@/components/common-form-input/FormFullNameInput';
import FormImageInput from '@/components/common-form-input/FormImageInput';
import { FormNationalIdNumber } from '@/components/common-form-input/FormNationalIdNumber';
import { FormNicknameInput } from '@/components/common-form-input/FormNicknameInput';
import { FormPasswordInput } from '@/components/common-form-input/FormPasswordInput';
import { FormPhoneInput } from '@/components/common-form-input/FormPhoneNumber';
import FormRoleInput from '@/components/common-form-input/FormRoleInput';
import { FieldValues, UseFormReturn } from 'react-hook-form';

const useFormInput = <T extends FieldValues>({ form }: { form: UseFormReturn<T> }) => {
    return {
        phone: <FormPhoneInput form={form} />,
        password: <FormPasswordInput form={form} />,
        role: <FormRoleInput form={form} />,
        image: <FormImageInput form={form} />,
        email: <FormEmailInput form={form} />,
        fullName: <FormFullNameInput form={form} />,
        nationalIdNumber: <FormNationalIdNumber form={form} />,
        nickname: <FormNicknameInput form={form} />,
    };
};

export default useFormInput;
