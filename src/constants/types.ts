import { LocalePrefix, LocalePrefixMode } from 'next-intl/routing';

export type LocaleType = 'en' | 'ar';
export type ColsType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type SpanType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type LocaleSetting = {
    locales: LocaleType[];
    defaultLocale: LocaleType;
    localePrefix: LocalePrefix<string[], LocalePrefixMode> | undefined;
};

export type FormSettings = {
    mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all' | undefined;
};
