'use client';
import { useLocale } from 'next-intl';
export const useArabic = () => {
    const locale = useLocale();
    const isRtl = locale === 'ar';
    return isRtl;
};
