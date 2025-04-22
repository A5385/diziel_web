'use client';

import { useLocale } from 'next-intl';
import Error from 'next/error';

export default function NotFound() {
    const locale = useLocale();
    return (
        <html lang={locale}>
            <body dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <Error statusCode={404} />
            </body>
        </html>
    );
}
