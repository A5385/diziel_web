'use client';
import {
    CreateDriverProfile,
    CreateVisa,
    UpdateDriverProfile,
    UpdateVisa,
    UploadCriminalRecord,
    UploadDriverLicense,
    UploadDriverPassport,
    UploadDrugTest,
    UploadVisaImage,
} from '@/api-service/data-service/DriverService';
import { AKButton } from '@/components/my-components/AKButton';
import { AKForm } from '@/components/my-components/form/AKForm';
import AppConfig from '@/constants/AppSettings';
import useZod from '@/hooks/useZod';
import { DriverSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import FormNavigation from '../FormNavigation';
import { useUserForm } from '../UserFormContext';
import StepFive from './StepFive';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

const DriverForm = ({ driverData }: { driverData?: DriverSchema | undefined }) => {
    const t = useTranslations();
    const [step, setStep] = useState(1);
    const { profileId } = useUserForm();
    const schema = useZod().schemas.driverSchema;

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            driverType: driverData?.driverType ?? 'national',
            grade: driverData?.grade ?? 'first',
            documents: {
                criminalRecord: undefined,
                drugTest: {
                    testDate: driverData?.documents?.drugTest?.testDate ?? undefined,
                    result: driverData?.documents?.drugTest?.result ?? 'positive',
                    testImage: undefined,
                },
                passport: {
                    number: driverData?.documents?.passport?.number ?? '',
                    face: undefined,
                    back: undefined,
                    visas: driverData?.documents?.passport?.visas?.length
                        ? driverData?.documents?.passport?.visas?.map((visa) => ({
                              id: visa?.id,
                              image: undefined,
                              startDate: visa?.startDate ?? undefined,
                              endDate: visa?.endDate ?? undefined,
                              country: visa?.country ?? '',
                              comments: visa?.comments ?? '',
                          }))
                        : [
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
                    number: driverData?.documents?.license?.number ?? '',
                    type: driverData?.documents?.license?.type ?? 'first',
                    traffic_unit: driverData?.documents?.license?.traffic_unit ?? '',
                    face: undefined,
                    back: undefined,
                    startDate: driverData?.documents?.license?.startDate ?? undefined,
                    endDate: driverData?.documents?.license?.endDate ?? undefined,
                },
            },
        },
    });
    // console.log('form: ', form.getValues());
    const driverType = useWatch({ control: form.control, name: 'driverType' });
    const fieldArray = useFieldArray({ control: form.control, name: 'documents.passport.visas' });

    const append = () => {
        fieldArray.append({
            image: undefined,
            startDate: new Date(),
            endDate: new Date(),
            country: '',
            comments: '',
        });
    };

    const createDriverProfile = CreateDriverProfile();
    const updateDriverProfile = UpdateDriverProfile();

    const uploadCriminalRecord = UploadCriminalRecord();
    const uploadDrugTest = UploadDrugTest();
    const uploadDriverLicense = UploadDriverLicense();
    const uploadDriverPassport = UploadDriverPassport();

    const createVisa = CreateVisa();
    const updateVisa = UpdateVisa();

    const uploadVisaImage = UploadVisaImage();
    const submit = async (data: FormType) => {
        if (!profileId) return;

        const { documents, driverType, ...rest } = data;

        // 1️⃣  save/update driver profile (no files yet)
        const sendProfileData = {
            ...rest,
            profileId,
            driverType,
            documents: {
                ...documents,
                passport:
                    driverType !== 'national' ? { number: documents.passport?.number } : undefined,
            },
        };

        const savedProfile = driverData
            ? await updateDriverProfile.mutateAsync({
                  id: driverData.id,
                  data: sendProfileData,
              })
            : await createDriverProfile.mutateAsync({ data: sendProfileData });

        if (!savedProfile) return;

        const doc = savedProfile.documents;

        /* ─────────────────────── 2️⃣  FILE UPLOADS ─────────────────────── */
        const uploadTasks: Promise<unknown>[] = [];

        // criminal record
        if (documents.criminalRecord) {
            uploadTasks.push(
                uploadCriminalRecord.mutateAsync({
                    id: doc.id,
                    data: { file: documents.criminalRecord },
                }),
            );
        }

        // drug test
        if (documents.drugTest?.testImage) {
            uploadTasks.push(
                uploadDrugTest.mutateAsync({
                    id: doc.drugTest.id,
                    data: { file: documents.drugTest.testImage },
                }),
            );
        }

        // license (face/back)
        if (documents.license?.face || documents.license?.back) {
            uploadTasks.push(
                uploadDriverLicense.mutateAsync({
                    id: doc.license.id,
                    data: {
                        faceFile: documents.license.face,
                        backFile: documents.license.back,
                    },
                }),
            );
        }

        /* ───────────────  passport & visas for NON-national drivers ───────────── */
        if (driverType !== 'national' && doc.passport) {
            // passport sides
            if (documents.passport?.face || documents.passport?.back) {
                uploadTasks.push(
                    uploadDriverPassport.mutateAsync({
                        id: doc.passport.id,
                        data: {
                            faceFile: documents.passport.face,
                            backFile: documents.passport.back,
                        },
                    }),
                );
            }

            // visas
            if (documents.passport?.visas?.length) {
                const visaTasks = documents.passport.visas.map(async (v) => {
                    // create or update visa row
                    const visaRes = v?.id
                        ? await updateVisa.mutateAsync({ id: v.id, data: { dto: v } })
                        : await createVisa.mutateAsync({
                              data: { dto: { ...v, passportId: doc.passport!.id } },
                          });

                    // upload visa image (if any)
                    if (visaRes && v?.image) {
                        await uploadVisaImage.mutateAsync({
                            id: visaRes.id,
                            data: { file: v?.image },
                        });
                    }
                });

                uploadTasks.push(...visaTasks);
            }
        }

        /* ─────────────────────── 3️⃣  await all uploads ─────────────────────── */
        const results = await Promise.allSettled(uploadTasks);
        const rejected = results.filter((r) => r.status === 'rejected');

        if (rejected.length) {
            console.error('Some uploads failed', rejected);
            // TODO: toast.warning(t('upload-partial-error'));
        }
    };

    const isPreviousDisabled = step === 1;
    const isNextDisabled = driverType !== 'national' ? step === 5 : step === 3;

    const stepTitles: Record<number, string> = {
        1: 'driver-step-basic',
        2: 'driver-step-drug',
        3: 'driver-step-license',
        4: 'driver-step-passport',
        5: 'driver-step-visas',
    };

    return (
        <AKForm
            form={form}
            submit={submit}
            columns={2}
            title={stepTitles[step]}
            formButtons={
                <div className='flex w-full flex-col gap-4'>
                    <div className='mt-4 flex w-full items-center justify-evenly'>
                        <AKButton
                            type='button'
                            title={t('previous')}
                            onClick={() => setStep(step - 1)}
                            color='gray'
                            disabled={isPreviousDisabled}
                            className='!w-1/3'
                            variant={'outline'}
                        />
                        <AKButton
                            type='button'
                            variant={'outline'}
                            title={t('next')}
                            onClick={() => setStep(step + 1)}
                            color='gray'
                            disabled={isNextDisabled}
                            className='!w-1/3'
                        />
                    </div>
                    <FormNavigation
                        show={driverData !== undefined}
                        submitProps={{
                            fullWidth: true,
                            title: driverData ? 'update' : 'save',
                            form,
                        }}
                    />
                </div>
            }
        >
            {step === 1 && <StepOne form={form} />}
            {step === 2 && <StepTwo form={form} driverData={driverData} />}
            {step === 3 && <StepThree form={form} driverData={driverData} />}
            {step === 4 && driverType !== 'national' && (
                <StepFour form={form} driverData={driverData} />
            )}
            {step === 5 && <StepFive form={form} fieldArray={fieldArray} append={append} />}
        </AKForm>
    );
};

export default DriverForm;
