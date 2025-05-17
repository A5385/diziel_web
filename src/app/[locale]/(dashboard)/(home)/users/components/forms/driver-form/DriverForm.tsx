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
import AppConfig from '@/constants/AppSettings';
import {
    DriverGradeList,
    DriverLicenseTypeList,
    DriverTypeList,
    DrugTestResultList,
} from '@/constants/enum-list';
import { GenerateFieldControlName } from '@/helpers/GenerateFieldControlName';
import useZod from '@/hooks/useZod';
import { DriverGrade, DriverLicenseType, DriverType } from '@/types/prisma';
import { DriverSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Path, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { CiTrash } from 'react-icons/ci';
import { z } from 'zod';
import FormNavigation from '../FormNavigation';
import { useUserForm } from '../UserFormContext';

const DriverForm = ({ data }: { data?: DriverSchema | undefined }) => {
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
        mode: AppConfig.form.mode,
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
                    type: 'first',
                    traffic_unit: '',
                    face: undefined,
                    back: undefined,
                    startDate: undefined,
                    endDate: undefined,
                },
            },
        },
    });
    console.log('form: ', form.getValues());
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
                // Use Promise.all to run the uploads concurrently
                await Promise.all([
                    uploadCriminalRecord.mutateAsync({
                        data: { file: criminalRecord },
                        id: createProfile.documents.id,
                    }),
                    uploadDrugTest.mutateAsync({
                        data: { file: testImage },
                        id: createProfile.documents.drugTest.id,
                    }),
                    uploadDriverLicense.mutateAsync({
                        data: { faceFile: licenseFace, backFile: licenseBack },
                        id: createProfile.documents.license.id,
                    }),
                    uploadDriverPassport.mutateAsync({
                        data: { faceFile: passportFace, backFile: passportBack },
                        id: createProfile.documents.passport.id,
                    }),

                    // If the driver is not 'national', handle visa uploads
                    ...(data?.driverType !== 'national' && createProfile.documents.passport.id
                        ? visas.map(async ({ image, ...visa }) => {
                              const newVisa = await createVisa.mutateAsync({
                                  data: {
                                      dto: {
                                          ...visa,
                                          passportId: createProfile?.documents?.passport?.id,
                                      },
                                  },
                              });

                              if (newVisa) {
                                  await uploadVisaImage.mutateAsync({
                                      data: { file: image },
                                      id: newVisa.id,
                                  });
                              }
                          })
                        : []), // If the driver is 'national', skip visa uploads
                ]);
            }
        }
    };

    const isPreviousDisabled = step === 1;
    const isNextDisabled = driverType !== 'national' ? step === 5 : step === 3;

    return (
        <AKForm
            form={form}
            submit={submit}
            columns={2}
            submitButtonFullWidth
            submitButtonTitle={'save'}
        >
            {step === 1 && (
                <>
                    <AKFormInput
                        form={form}
                        inputType='select'
                        label={t('driver-type')}
                        name='driverType'
                        selectItems={DriverTypeList.map((type) => ({
                            label: t(type),
                            value: type,
                        }))}
                    />
                    <AKFormInput
                        form={form}
                        inputType='select'
                        label={t('driver-grade')}
                        name='grade'
                        selectItems={DriverGradeList.map((grade) => ({
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
                        src='/document_avatar.png'
                        label={t('criminal-record')}
                        shape='square-vertical'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.drugTest.testImage'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/document_avatar.png'
                        label={t('drug-test-image')}
                        shape='square-vertical'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        form={form}
                        inputType='date'
                        name='documents.drugTest.testDate'
                        label={t('test-date')}
                    />
                    <AKFormInput
                        form={form}
                        inputType='select'
                        name='documents.drugTest.result'
                        label={t('test-result')}
                        selectItems={DrugTestResultList.map((test) => ({
                            label: t(test),
                            value: test,
                        }))}
                    />
                </>
            )}
            {step === 3 && (
                <>
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.license.number'
                        label={t('license-number')}
                    />
                    <AKFormInput
                        form={form}
                        inputType='select'
                        label={t('license-type')}
                        name='documents.license.type'
                        selectItems={DriverLicenseTypeList.map((type) => ({
                            label: t(type),
                            value: type,
                        }))}
                    />
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.license.traffic_unit'
                        label={t('traffic-unit')}
                    />

                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.license.face'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/license_avatar.jpg'
                        label={t('license-face')}
                        shape='square-horizontal'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.license.back'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/license_avatar.jpg'
                        label={t('license-back')}
                        shape='square-horizontal'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />

                    <AKFormInput
                        form={form}
                        inputType='date'
                        name='documents.license.startDate'
                        label={t('start-date')}
                    />
                    <AKFormInput
                        form={form}
                        inputType='date'
                        name='documents.license.endDate'
                        label={t('end-date')}
                    />
                </>
            )}

            {step === 4 && driverType !== 'national' && (
                <>
                    <AKFormInput
                        form={form}
                        inputType='input'
                        name='documents.passport.number'
                        label={t('passport-number')}
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.passport.face'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/document_avatar.png'
                        label={t('passport-face')}
                        shape='square-vertical'
                        accept='.jpeg,.jpg,.png,web'
                        required
                    />
                    <AKFormInput
                        inputType='upload-file'
                        name={'documents.passport.back'}
                        form={form}
                        descStyle='text-center'
                        control={form.control}
                        src='/document_avatar.png'
                        label={t('passport-back')}
                        shape='square-vertical'
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
                                    src='/document_avatar.png'
                                    label={t('Visa-image')}
                                    shape='square-vertical'
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
                                        ) as Path<FormType>
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
                                        ) as Path<FormType>
                                    }
                                    label={t('country')}
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
                                    label={t('comments')}
                                />
                            </div>
                        ))}
                    <AKButton
                        type='button'
                        title={t('add-another-visa')}
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
            <div className='col-span-2 mt-4 flex items-center justify-evenly'>
                <AKButton
                    type='button'
                    title={t('next')}
                    onClick={() => setStep(step + 1)}
                    disabled={isNextDisabled}
                />
                <AKButton
                    type='button'
                    title={t('previous')}
                    onClick={() => setStep(step - 1)}
                    disabled={isPreviousDisabled}
                />
            </div>
            <FormNavigation show={data !== undefined} />
        </AKForm>
    );
};

export default DriverForm;
