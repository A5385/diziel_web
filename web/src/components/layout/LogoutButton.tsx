'use client';
import { Routes } from '@/constants/route';
import { handleLogout } from '@/helpers/local-storage-service';
import { useIsMobile } from '@/hooks/use-mobile';
import { useArabic } from '@/hooks/useArabic';
import { LogoutIcon } from '@/styles/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const LogoutButton = () => {
    const { push } = useRouter();
    const t = useTranslations();
    const mobile = useIsMobile();
    const ar = useArabic();
    return (
        <Button
            className='cursor-pointer'
            type='button'
            variant={'outline'}
            onClick={() => {
                handleLogout();
                push(Routes.login.url);
            }}
        >
            <LogoutIcon color='black' className={ar ? 'rotate-180' : ''} />

            {!mobile && t('logout')}
        </Button>
    );
};

export default LogoutButton;
