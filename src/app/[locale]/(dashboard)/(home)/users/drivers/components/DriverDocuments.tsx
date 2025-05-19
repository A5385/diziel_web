import { AKButton } from '@/components/my-components/AKButton';
import { MotionSection } from '@/components/my-components/MotionSection';
import { formatDate } from '@/helpers/formatDate';
import { DriverDocumentsSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

type StepType = 1 | 2 | 3 | 4 | null;
const DriverDocuments = ({ documents }: { documents?: DriverDocumentsSchema }) => {
    const [step, setStep] = useState<StepType>(null);

    const t = useTranslations();
    const drugTest = documents?.drugTest;
    const license = documents?.license;
    const passport = documents?.passport;

    return (
        <div className='flex w-full flex-col items-center justify-center gap-4 p-4'>
            {/* criminal record */}
            <SectionContainer title='criminal-record' s={1} step={step} setStep={setStep}>
                <div className='flex w-full items-start justify-evenly gap-4'>
                    <Link
                        href={documents?.criminalRecord ?? '/avatar/license_avatar.jpg'}
                        target='_blank'
                    >
                        <Image
                            src={documents?.criminalRecord ?? '/avatar/license_avatar.jpg'}
                            alt='criminal-record'
                            width={200}
                            height={75}
                        />
                    </Link>
                </div>
            </SectionContainer>

            {/* drug test */}
            <SectionContainer title='drug-test' s={2} step={step} setStep={setStep}>
                <div className='flex w-full items-start justify-evenly gap-4'>
                    <Link
                        href={drugTest?.testImage ?? '/avatar/license_avatar.jpg'}
                        target='_blank'
                    >
                        <Image
                            src={drugTest?.testImage ?? '/avatar/license_avatar.jpg'}
                            alt='drug-test'
                            width={200}
                            height={75}
                        />
                    </Link>
                </div>
                <RecordContainer>
                    <DocumentRecord
                        label='test-result'
                        value={drugTest?.result && t(drugTest?.result)}
                    />
                    <DocumentRecord
                        label='test-date'
                        value={formatDate(drugTest?.testDate?.toString())}
                    />
                </RecordContainer>
            </SectionContainer>
            {/* License Info */}
            <SectionContainer title='driver-license' s={3} step={step} setStep={setStep}>
                <div className='flex w-full items-start justify-evenly gap-4'>
                    <Link href={license?.face ?? '/avatar/license_avatar.jpg'} target='_blank'>
                        <Image
                            src={license?.face ?? '/avatar/license_avatar.jpg'}
                            alt='license-face'
                            width={200}
                            height={75}
                        />
                    </Link>
                    <Link href={license?.back ?? '/avatar/license_avatar.jpg'} target='_blank'>
                        <Image
                            src={license?.back ?? '/avatar/license_avatar.jpg'}
                            alt='license-back'
                            width={200}
                            height={75}
                        />
                    </Link>
                </div>
                <RecordContainer>
                    <DocumentRecord label='license-number' value={license?.number?.toString()} />
                    <DocumentRecord label='traffic-unit' value={license?.traffic_unit} />
                    <DocumentRecord
                        label='start-date'
                        value={formatDate(license?.startDate?.toString())}
                    />
                    <DocumentRecord
                        label='end-date'
                        value={formatDate(license?.endDate?.toString())}
                    />
                </RecordContainer>
            </SectionContainer>

            {/* Passport data */}
            <SectionContainer title='driver-passport' s={4} step={step} setStep={setStep}>
                <div className='flex w-full items-start justify-evenly gap-4'>
                    <Link href={passport?.face ?? '/avatar/license_avatar.jpg'} target='_blank'>
                        <Image
                            src={passport?.face ?? '/avatar/license_avatar.jpg'}
                            alt='license-face'
                            width={200}
                            height={75}
                        />
                    </Link>
                    <Link href={passport?.back ?? '/avatar/license_avatar.jpg'} target='_blank'>
                        <Image
                            src={passport?.back ?? '/avatar/license_avatar.jpg'}
                            alt='license-back'
                            width={200}
                            height={75}
                        />
                    </Link>
                </div>
                <RecordContainer>
                    <DocumentRecord label='passport-number' value={passport?.number?.toString()} />
                    {passport &&
                        passport?.visas &&
                        passport?.visas?.length > 0 &&
                        passport?.visas?.map((visa, index) => (
                            <>
                                <div className='flex w-full items-start justify-center gap-4'>
                                    <Link
                                        href={visa?.image ?? '/avatar/license_avatar.jpg'}
                                        target='_blank'
                                    >
                                        <Image
                                            src={visa?.image ?? '/avatar/license_avatar.jpg'}
                                            alt={`visa-${visa?.id ?? index}`}
                                            width={200}
                                            height={75}
                                        />
                                    </Link>
                                </div>
                                <div className='divide w-3/4 divide-y divide-gray-200'>
                                    <DocumentRecord label='country' value={visa?.country} />
                                    <DocumentRecord
                                        label='start-date'
                                        value={formatDate(visa?.startDate?.toString())}
                                    />
                                    <DocumentRecord
                                        label='end-date'
                                        value={formatDate(visa?.endDate?.toString())}
                                    />
                                    <DocumentRecord label='comments' value={visa?.comments} />
                                </div>
                            </>
                        ))}
                </RecordContainer>
            </SectionContainer>
        </div>
    );
};

export default DriverDocuments;

const DocumentRecord = ({ label, value }: { label: string; value?: string | null | undefined }) => {
    const t = useTranslations();
    if (value)
        return (
            <div className='flex items-center justify-between px-2 py-2'>
                <p className='text-gray-600'>{t(label)}</p>
                <p className='text-main col-span-2'>{value}</p>
            </div>
        );
};

const RecordContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className='divide mx-auto mt-4 divide-y divide-gray-200 rounded-xl border p-2'>
            {children}
        </div>
    );
};

const SectionContainer = ({
    children,
    title,
    s,
    step,
    setStep,
}: {
    children: ReactNode;
    title?: string;
    s: StepType;
    step: StepType;
    setStep: Dispatch<SetStateAction<StepType>>;
}) => {
    const t = useTranslations();
    const show = step === s;
    return (
        <div className='flex w-full flex-col items-center justify-center gap-4 rounded-xl border p-4 shadow-sm'>
            {title && (
                <h3 className='text-main mb-4 w-full text-center text-4xl font-semibold'>
                    {t(title)}
                </h3>
            )}
            <AKButton
                type='button'
                title={step === s ? t('hide') : t('show')}
                onClick={() => setStep(step !== s ? s : null)}
                className='w-1/3'
            />
            {show && (
                <MotionSection
                    show={show}
                    key='doc-section'
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
                    className='w-full overflow-hidden'
                >
                    {children}
                </MotionSection>
            )}
        </div>
    );
};
