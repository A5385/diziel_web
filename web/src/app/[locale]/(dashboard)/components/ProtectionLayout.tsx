'use client';

import { refreshWebAccessToken } from '@/api-service/axios-service/RefreshToken';
import { Routes } from '@/constants/route';
import { handleLogout, isWebTokenExpired, TokenService } from '@/helpers/local-storage-service';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

const ProtectionLayout = ({ children }: { children: ReactNode }) => {
    const t = useTranslations();
    const { push } = useRouter();
    const [authenticated, setAuthenticated] = useState<boolean | null>(null); // null means loading state

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = TokenService.accessToken.get();

            if (!token) {
                // Not authenticated, redirect to login
                setAuthenticated(false);
                handleLogout();
                push(Routes.login.url);
                return;
            }

            if (isWebTokenExpired(token)) {
                // Try to refresh the token if expired
                try {
                    const newAccessToken = await refreshWebAccessToken(
                        TokenService.refreshToken.get() ?? '',
                    );
                    if (!newAccessToken) {
                        // Refresh failed, user needs to login again
                        setAuthenticated(false);
                        handleLogout();
                        push(Routes.login.url);
                    } else {
                        // Successfully refreshed, stay authenticated
                        setAuthenticated(true);
                    }
                } catch (error) {
                    // If refresh token fails or some other error occurs, log out
                    setAuthenticated(false);
                    handleLogout();
                    push(Routes.login.url);
                }
            } else {
                // Token is valid, authenticated
                setAuthenticated(true);
            }
        };

        checkAuthentication();
    }, [push]); // Dependency on `push` to re-run the effect when needed

    if (authenticated === null) {
        return (
            <div className='flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-200 to-sky-200 dark:from-purple-900 dark:to-sky-900'>
                <h1 className='text-xl font-bold uppercase'>{t('loading')}</h1>
            </div>
        ); // Show loading while checking authentication
    }

    if (!authenticated) {
        return null; // User is not authenticated, nothing is rendered (handled by redirecting)
    }

    return <>{children}</>; // Render protected content
};

export default ProtectionLayout;
