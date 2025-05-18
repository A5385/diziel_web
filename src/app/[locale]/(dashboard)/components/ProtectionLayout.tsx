'use client';

import { Logout, UserAuthenticated } from '@/api-service/data-service/AuthService';
import { Routes } from '@/constants/route';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const ProtectionLayout = ({ children }: { children: ReactNode }) => {
    const t = useTranslations();
    const router = useRouter();

    // query & mutation hooks
    const { data: session, isLoading } = UserAuthenticated();
    const logout = Logout();

    const authenticated = !!session; // boolean

    /** run once whenever loading finishes */
    useEffect(() => {
        if (isLoading) return; // still fetching

        if (!authenticated) {
            // optional: prevent multiple logout calls
            if (logout.isIdle) {
                logout.mutateAsync({ data: {} }).finally(() => {
                    router.replace(Routes.login.url);
                });
            } else {
                router.replace(Routes.login.url);
            }
        }
    }, [isLoading, authenticated, logout, router]);

    // ① loading spinner
    if (isLoading) {
        return (
            <div className='flex h-screen w-full items-center justify-center bg-gradient-to-br from-purple-200 to-sky-200 dark:from-purple-900 dark:to-sky-900'>
                <h1 className='text-xl font-bold uppercase'>{t('loading')}</h1>
            </div>
        );
    }

    // ② unauthenticated – redirect triggered in useEffect, render nothing
    if (!authenticated) return null;

    // ③ authorised
    return <>{children}</>;
};

export default ProtectionLayout;
