'use client';

import { useSession } from '@/api-service/data-service/AuthService';
import { useTranslations } from 'next-intl';

const Welcome = () => {
    const t = useTranslations();
    const session = useSession();

    return (
        <div>
            <p className='text-md'>{t('welcome')} </p>
            <div className='flex items-center gap-4'>
                <h2 className='text-2xl font-semibold md:text-4xl'>
                    {session?.data?.fullName ?? ''}{' '}
                </h2>
                <span>👋</span>
            </div>
        </div>
    );
};

export default Welcome;
