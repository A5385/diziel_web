'use client';
import {
    CreateDriverProfile,
    CreateVisa,
    UploadCriminalRecord,
    UploadDriverLicense,
    UploadDriverPassport,
    UploadDrugTest,
    UploadVisaImage,
} from '@/api-service/data-service/DriverService';
import { AKButton } from '@/components/my-components/AKButton';
import { AKForm } from '@/components/my-components/AKForm';
import { AKFormInput } from '@/components/my-components/AKFormInput';
import AppSettings from '@/constants/AppSettings';
import { extractValueFromEnum } from '@/helpers/ExtractValueFromEnum';
import { GenerateFieldControlName } from '@/helpers/GenerateFieldControlName';
import useZod from '@/hooks/useZod';
import { DriverGrade, DriverLicenseType, DriverType } from '@/types/prisma';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Path, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { CiTrash } from 'react-icons/ci';
import { z } from 'zod';
import { useUserForm } from '../UserFormContext';

const DriverForm = () => {
    const t = useTranslations();
    const [step, setStep] = useState(1);
    const { profileId } = useUserForm();
    const fileValidator = useZod().fields.fileValidator;

    const schema = z.object({
        driverType: z.nativeEnum(DriverType),
        grade: z.nativeEnum(DriverGrade),

        documents: z.object({
            criminalRecord: fileValidator,
            drugTest: z.object({
                testDate: z.date(),
                result: z.string(),
                testImage: fileValidator,
            }),
            license: z.object({
                number: z.string(),
                type: z.nativeEnum(DriverLicenseType),
                traffic_unit: z.string(),
                face: fileValidator,
                back: fileValidator,
                startDate: z.date(),
                endDate: z.date(),
            }),
            passport: z.object({
                number: z.string(),
                face: fileValidator,
                back: fileValidator,
                visas: z.array(
                    z.object({
                        image: fileValidator,
                        startDate: z.date(),
                        endDate: z.date(),
                        country: z.string(),
                        comments: z.string().optional(),
                    }),
                ),
            }),
        }),
    });
    type FormType = z.infer<typeof schema>;
    const form = useForm<FormType>({
        mode: AppSettings.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            driverType: 'national',
            grade: 'first',
            documents: {
                criminalRecord: undefined,
                drugTest: {
                    testDate: undefined,
                    result: '',
                    testImage: undefined,
                },
                passport: {
                    number: '',
                    face: undefined,
                    back: undefined,
                    visas: [
                        {
                            image: undefined,
                            startDate: undefined,
                            endDate: undefined,
                            country: '',
                            comments: '',
                        },
                    ],
                },
                license: {
                    number: '',
                    type: 'business',
                    traffic_unit: '',
                    face: undefined,
                    back: undefined,
                    startDate: undefined,
                    endDate: undefined,
                },
            },
        },
    });

    const driverType = useWatch({ control: form.control, name: 'driverType' });
    const fieldArray = useFieldArray({ control: form.control, name: 'documents.passport.visas' });

    const deleteItem = async (index: number) => {
        fieldArray.remove(index);
    };

    const createDriverProfile = CreateDriverProfile();

    const uploadCriminalRecord = UploadCriminalRecord();
    const uploadDrugTest = UploadDrugTest();
    const uploadDriverLicense = UploadDriverLicense();
    const uploadDriverPassport = UploadDriverPassport();

    const createVisa = CreateVisa();
    const uploadVisaImage = UploadVisaImage();

    const submit: SubmitHandler<FormType> = async ({ documents, ...data }) => {
        const { passport, drugTest, license, criminalRecord } = documents;
        const { visas, number, face: passportFace, back: passportBack } = passport;
        const { testImage, ...drugTestData } = drugTest;
        const { face: licenseFace, back: licenseBack, ...licenseData } = license;

        if (profileId) {
            const createProfile = await createDriverProfile.mutateAsync({
                data: {
                    dto: {
                        ...data,
                        profileId,
                        documents: {
                            drugTest: { ...drugTestData },
                            license: { ...licenseData },
                            ...(data.driverType !== 'national' && { passport: { number } }),
                        },
                    },
                },
            });
            if (createProfile) {
                await uploadCriminalRecord.mutateAsync({
                    data: { file: criminalRecord },
                    id: createProfile.documents.id,
                });
                await uploadDrugTest.mutateAsync({
                    data: { file: testImage },
                    id: createProfile.documents.drugTest.id,
                });

                await uploadDriverLicense.mutateAsync({
                    data: { faceFile: licenseFace, backFile: licenseBack },
                    id: createProfile.documents.passport.id,
                });

                await uploadDriverPassport.mutateAsync({
                    data: { faceFile: passportFace, backFile: passportBack },
                    id: createProfile.documents.passport.id,
                });

                if (data?.driverType !== 'national' && createProfile.documents.passport.id) {
                    for (const { image, ...visa } of visas) {
                        const newVisa = await createVisa.mutateAsync({
                            data: { ...visa },
                        });

                        if (newVisa) {
                            await uploadVisaImage.mutateAsync({
                                data: { file: image },
                                id: newVisa.id,
                            });
                        }
                    }
                }
            }
        }
    };

    const isPreviousDisabled = step === 1;
    const isNextDisabled = driverType !== 'national' ? step === 5 : step === 3;

    return (
        <AKForm
            form={form}
            submit={submit}
            columns={1}
            submitButtonFullWidth
            submitButtonTitle={t('save')}
        >
            {step === 1 && (
                <>
                    <AKFormInput
                        form={form}
                        inputType='select'
                        label='Driver Type'
                        name='driverType'
                        selectItems={extractValueFromEnum(DriverType).map((type) => ({
                            label: t(type),
                            value: type,
                        }))}
                    />
                    <AKFormInput
                        form={form}
                        inputType='select'
                        label='Driver Grade'
                        name='grade'
                        selectItems={extractValueFromEnum(DriverGrade).map((grade) => ({
                            label: t(grade),
                            value: grade,
                        }))}
                    />
                </>
            )}
            {step === 2 && (
                <>
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.criminalRecord'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/avatar.png'
                        label='Criminal Record'
                        shape='square'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        form={form}
                        inputType='date'
                        name='documents.drugTest.testDate'
                        label='Test Date'
                    />
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.drugTest.result'
                        label='Tresult'
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.drugTest.testImage'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/avatar.png'
                        label='Drug Test Image'
                        shape='square'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                </>
            )}
            {step === 3 && (
                <>
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.license.number'
                        label='License Number'
                    />
                    <AKFormInput
                        form={form}
                        inputType='select'
                        label='License Type'
                        name='documents.license.type'
                        selectItems={extractValueFromEnum(DriverLicenseType).map((type) => ({
                            label: t(type),
                            value: type,
                        }))}
                    />
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.license.traffic_unit'
                        label='Traffic Unit'
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.license.face'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/avatar.png'
                        label='License Face'
                        shape='square'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.license.back'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/avatar.png'
                        label='License Back'
                        shape='square'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <div className='flex w-full items-center gap-4'>
                        {' '}
                        <AKFormInput
                            form={form}
                            inputType='date'
                            name='documents.license.startDate'
                            label='Start Date'
                        />
                        <AKFormInput
                            form={form}
                            inputType='date'
                            name='documents.license.endDate'
                            label='End Date'
                        />
                    </div>
                </>
            )}

            {step === 4 && driverType !== 'national' && (
                <>
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.passport.number'
                        label='Passport Number'
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.passport.face'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/avatar.png'
                        label='Passport Face'
                        shape='square'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.passport.back'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/avatar.png'
                        label='Passport Back'
                        shape='square'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                </>
            )}
            {step === 5 && (
                <>
                    {fieldArray.fields.length > 0 &&
                        fieldArray.fields.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-1 gap-4'>
                                {fieldArray.fields.length > 1 && (
                                    <AKButton
                                        type='button'
                                        size='icon'
                                        icon={<CiTrash size={20} />}
                                        color={'red'}
                                        onClick={() => deleteItem(index)}
                                        className='mt-6'
                                    />
                                )}
                                <AKFormInput
                                    inputType='upload-file'
                                    name={
                                        GenerateFieldControlName(
                                            'documents.passport.visas',
                                            index,
                                            'image',
                                        ) as Path<FormType>
                                    }
                                    form={form}
                                    descStyle='text-center'
                                    control={form.control}
                                    src='/avatar.png'
                                    label='Visa Image'
                                    shape='square'
                                    accept='.jpeg,.jpg,.png,web'
                                    required
                                    // formFieldStyle='col-span-2'
                                />

                                <AKFormInput
                                    form={form}
                                    inputType='date'
                                    name={
                                        GenerateFieldControlName(
                                            'documents.passport.visas',
                                            index,
                                            'startDate',
                                        ) as Path<FormType>
                                    }
                                    label={'Start Date'}
                                />
                                <AKFormInput
                                    form={form}
                                    inputType='date'
                                    name={
                                        GenerateFieldControlName(
                                            'documents.passport.visas',
                                            index,
                                            'endDate',
                                        ) as Path<FormType>
                                    }
                                    label={'End Date'}
                                />

                                <AKFormInput
                                    form={form}
                                    inputType='input'
                                    name={
                                        GenerateFieldControlName(
                                            'documents.passport.visas',
                                            index,
                                            'country',
                                        ) as Path<FormType>
                                    }
                                    label={'Country'}
                                    // formFieldStyle='col-span-2'
                                />
                                <AKFormInput
                                    form={form}
                                    inputType='text-area'
                                    name={
                                        GenerateFieldControlName(
                                            'documents.passport.visas',
                                            index,
                                            'comments',
                                        ) as Path<FormType>
                                    }
                                    label={'Comments'}
                                    // formFieldStyle='col-span-2'
                                />
                            </div>
                        ))}
                    <AKButton
                        type='button'
                        title={'Add Visa'}
                        color='green'
                        onClick={() =>
                            fieldArray.append({
                                image: undefined,
                                startDate: new Date(),
                                endDate: new Date(),
                                country: '',
                                comments: '',
                            })
                        }
                    />
                </>
            )}
            <div className='mt-4 flex items-center justify-evenly'>
                <AKButton
                    type='button'
                    title={t('next')}
                    onClick={() => setStep(step + 1)}
                    color='main'
                    disabled={isNextDisabled}
                />
                <AKButton
                    type='button'
                    title={t('previous')}
                    onClick={() => setStep(step - 1)}
                    color='main'
                    disabled={isPreviousDisabled}
                />
            </div>
        </AKForm>
    );
};

export default DriverForm;
