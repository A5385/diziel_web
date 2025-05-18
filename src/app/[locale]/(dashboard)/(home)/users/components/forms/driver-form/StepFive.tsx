import { AKButton } from '@/components/my-components/AKButton';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import GridWrapper from '@/components/my-components/GridWrapper';
import { Badge } from '@/components/ui/badge';
import { GenerateFieldControlName } from '@/helpers/GenerateFieldControlName';
import { useTranslations } from 'next-intl';
import { FieldValues, Path, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { CiTrash } from 'react-icons/ci';

const StepFive = <T extends FieldValues>({
    form,
    fieldArray,
    append,
}: {
    form: UseFormReturn<T>;
    fieldArray: UseFieldArrayReturn<T>;
    append: () => void;
}) => {
    const t = useTranslations();

    const deleteItem = async (index: number) => {
        fieldArray.remove(index);
    };
    return (
        <div className='col-span-2 flex w-full flex-col items-center justify-center gap-4'>
            {fieldArray.fields.length > 0 &&
                fieldArray.fields.map((field, index) => (
                    <div
                        key={field.id}
                        className='relative grid w-full grid-cols-1 gap-4 rounded-xl border p-4'
                    >
                        {fieldArray.fields.length > 1 && (
                            <AKButton
                                type='button'
                                size='icon'
                                iconBefore={<CiTrash size={20} />}
                                color={'red'}
                                onClick={() => deleteItem(index)}
                                className='absolute top-5 left-5'
                            />
                        )}
                        <Badge className='absolute top-0 right-0 flex h-8 w-8 rounded-full border'>
                            {index + 1}
                        </Badge>
                        <AKFormInput
                            inputType='upload-file'
                            name={
                                GenerateFieldControlName(
                                    'documents.passport.visas',
                                    index,
                                    'image',
                                ) as Path<T>
                            }
                            form={form}
                            descStyle='text-center'
                            control={form.control}
                            src={'/document_avatar.png'}
                            label={t('visa-image')}
                            shape='square-vertical'
                            accept='.jpeg,.jpg,.png,web'
                            required
                            span={2}
                            // formFieldStyle='col-span-2'
                        />

                        <GridWrapper cols={3} className='col-span-2 w-full'>
                            <AKFormInput
                                form={form}
                                inputType='date'
                                name={
                                    GenerateFieldControlName(
                                        'documents.passport.visas',
                                        index,
                                        'startDate',
                                    ) as Path<T>
                                }
                                label={t('start-date')}
                            />
                            <AKFormInput
                                form={form}
                                inputType='date'
                                name={
                                    GenerateFieldControlName(
                                        'documents.passport.visas',
                                        index,
                                        'endDate',
                                    ) as Path<T>
                                }
                                label={t('end-date')}
                            />
                            <AKFormInput
                                form={form}
                                inputType='input'
                                name={
                                    GenerateFieldControlName(
                                        'documents.passport.visas',
                                        index,
                                        'country',
                                    ) as Path<T>
                                }
                                label={t('country')}
                                // formFieldStyle='col-span-2'
                            />
                        </GridWrapper>
                        <AKFormInput
                            form={form}
                            inputType='text-area'
                            name={
                                GenerateFieldControlName(
                                    'documents.passport.visas',
                                    index,
                                    'comments',
                                ) as Path<T>
                            }
                            label={t('comments')}
                            span={2}
                        />
                    </div>
                ))}
            <AKButton
                type='button'
                title={t('add-another-visa')}
                color='green'
                onClick={append}
                className='mt-4'
            />
        </div>
    );
};

export default StepFive;
