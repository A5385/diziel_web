'use client';
export type LocaleType = 'en' | 'ar';
export type TranslationType = Record<LocaleType, { [key: string]: string }>;

export const useCustomTranslations = ({
    locale,
    translations,
}: {
    locale: LocaleType;
    translations: TranslationType;
}) => {
    const getTranslate = (key: keyof TranslationType['en']) => {
        return translations[locale]?.[key] || key;
    };

    return { getTranslate };
};
