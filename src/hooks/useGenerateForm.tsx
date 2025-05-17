import { AKForm, AKFormPropsType } from '@/components/my-components/AKForm';
import AppConfig from '@/constants/AppSettings';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';
import { TypeOf, ZodObject, ZodRawShape } from 'zod';
import useFormInput from './useFormInput';

export type UseGenerateFormProps<Schema extends ZodObject<ZodRawShape>> = Omit<
    AKFormPropsType<TypeOf<Schema>>,
    'form'
> & {
    schema: Schema;
    defaultValues: DefaultValues<TypeOf<Schema>>;
};

const useGenerateForm = <Schema extends ZodObject<ZodRawShape>>({
    schema,
    defaultValues,
    ...props
}: UseGenerateFormProps<Schema>) => {
    type FormType = TypeOf<Schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues,
    });

    const inputComponents = useFormInput<FormType>({ form });

    const keys = Object.keys(schema.shape) as (keyof typeof inputComponents)[];

    const Form = () => (
        <AKForm form={form} {...props}>
            {keys.map((key, i) => (
                <div key={i}>{inputComponents[key]}</div>
            ))}
        </AKForm>
    );

    return { Form, form };
};

export default useGenerateForm;
