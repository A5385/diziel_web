'use client';

import { Logout, UserAuthenticated } from '@/api-service/data-service/AuthService';
import { Routes } from '@/constants/route';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const ProtectionLayout = ({ children }: { children: ReactNode }) => {
    const t = useTranslations();
    const { push } = useRouter();
    const { data, isLoading } = UserAuthenticated();
    console.log('🚀 >  ProtectionLayout >  data:', data);

    const authenticated = data ? data : false;
    const logout = Logout();

    const handleLogout = async () => {
        const res = await logout.mutateAsync({ data: {} });
        if (res) {
            push(Routes.login.url);
        }
    };

    if (isLoading) {
        return (
            <div className='flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-200 to-sky-200 dark:from-purple-900 dark:to-sky-900'>
                <h1 className='text-xl font-bold uppercase'>{t('loading')}</h1>
            </div>
        ); // Show loading while checking authentication
    }

    if (!authenticated) {
        handleLogout();
        push(Routes.login.url);
        return null; // User is not authenticated, nothing is rendered (handled by redirecting)
    }

    return <>{children}</>; // Render protected content
};

export default ProtectionLayout;
