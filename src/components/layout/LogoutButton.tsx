'use client';
import { Logout } from '@/api-service/data-service/AuthService';
import { Routes } from '@/constants/route';
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
    const logout = Logout();
    const handleLogout = async () => {
        await logout.mutateAsync({ data: {} }).then(() => {
            push(Routes.login.url);
        });
    };
    return (
        <Button className='cursor-pointer' type='button' variant={'outline'} onClick={handleLogout}>
            <LogoutIcon color='black' className={ar ? 'rotate-180' : ''} />

            {!mobile && t('logout')}
        </Button>
    );
};

export default LogoutButton;
