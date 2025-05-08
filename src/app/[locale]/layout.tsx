import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import GlobalProviders from '@/providers/GlobalProviders';
import { cairo, geistMono, geistSans } from '@/styles/fonts';
import { ChildrenType } from '@/types/general';

import constants from '@/constants/AppSettings';
import { LocaleType } from '@/constants/types';
import { cn } from '@/lib/utils';
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
                className={cn(
                    cairo.variable,
                    geistSans.variable,
                    geistMono.variable,
                    locale === 'ar' ? 'font-cairo' : 'font-sans',
                    'antialiased',
                    'bg-white dark:bg-slate-900',
                )}
            >
                <GlobalProviders>{children}</GlobalProviders>
            </body>
        </html>
    );
}
