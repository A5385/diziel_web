import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import GlobalProviders from '@/providers/GlobalProviders';
import { geistMono, geistSans } from '@/styles/fonts';
import { ChildrenType } from '@/types/general';

import constants from '@/constants/constants';
import { LocaleType } from '@/constants/types';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: constants.settings.title,
    description: constants.settings.title,
};

type RootLayoutProps = ChildrenType & {
    params: Promise<{ locale: LocaleType }>;
};

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <GlobalProviders>{children}</GlobalProviders>
            </body>
        </html>
    );
}
