'use client';

import { AKButton } from '@/components/my-components/AKButton';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, startTransition } from 'react';
import { GoBackIcon, InfoIcon, ResetIcon } from '../../styles/icons';

export type ErrorPropsType = {
    error: {
        message: string;
    };
    reset?: () => void;
};

const Error: FC<ErrorPropsType> = ({ error, reset }: ErrorPropsType) => {
    const { back, refresh } = useRouter();
    const t = useTranslations();
    const reload = () => {
        startTransition(() => {
            refresh();
            if (reset) reset();
        });
    };
    return (
        <div className='flex h-screen w-full items-center justify-center bg-red-50'>
            <div className='flex max-w-3xl flex-col items-center rounded-xl bg-white p-8 shadow-xl'>
                <InfoIcon size={60} color='red' />
                <div className='flex flex-col items-center'>
                    <h2 className='text-4xl font-bold text-red-600 uppercase'>{t('error')}</h2>
                    <p className='text-2xl font-semibold text-red-600'>
                        {t('something-went-wrong')}
                    </p>
                </div>
                <p className='mt-6 text-center text-sm text-gray-700'>{error.message}</p>

                <div className='mt-6 flex items-center gap-2'>
                    <AKButton
                        type='button'
                        variant='outline'
                        icon={<GoBackIcon size={16} />}
                        title={t('go-back')}
                        onClick={() => back()}
                        // className='!w-full'
                    />
                    <AKButton
                        type='button'
                        variant='outline'
                        icon={<ResetIcon size={16} />}
                        title={t('try-again')}
                        onClick={reload}
                        // className='!w-full'
                    />
                </div>
            </div>
        </div>
    );
};

export default Error;
