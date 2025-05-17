'use server';
import { cookies } from 'next/headers';

export const getLocale = async () => {
    if (typeof window !== 'undefined') {
        const m = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
        return m ? decodeURIComponent(m[1]) : 'en';
    }

    try {
        const cookieStore = await cookies();
        const locale = cookieStore.get('NEXT_LOCALE');
        // console.log('🚀 >  getLocale >  locale:', locale);

        return locale?.value;
    } catch {
        return 'en';
    }
};
