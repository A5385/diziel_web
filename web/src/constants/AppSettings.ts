import { ThemeProviderProps } from 'next-themes';
import { ToasterProps } from 'sonner';
import { ColsType, FormSettings, LocaleSetting, SpanType } from './types';

export default {
    /// production
    isProduction: process.env.NODE_ENV === 'production',
    /// backend settings
    api: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    /// app settings
    settings: {
        title: 'Diziel',
        description: 'Shipping system',
        icon: '/logo/3asre3_logo-03.png',
        verticalLogo: '/logo/3asre3_logo-01.png',
        horizontalLogo: '/logo/3asre3_logo-02.png',
    },
    /// local storage key definition
    keys: {
        accessTokenKey: '1',
        refreshTokenKey: '2',
        phoneKey: '3',
        roleKey: '4',
        userIdKey: '5',
        entityIdKey: '6',
        profileIdKey: '7',
    },
    /// form default configuration
    form: {
        mode: 'onChange',
    } satisfies FormSettings,
    /// app default colors
    colors: {
        mainColor: '#1100ff',
        mainColorLight: '#4761f7',
        secColor: '#a9baca',
    },
    /// theme default configuration
    theme: {
        attribute: 'class',
        defaultTheme: 'system',
        enableSystem: true,
        disableTransitionOnChange: true,
    } satisfies ThemeProviderProps,
    /// toaster default configuration
    toaster: {
        theme: 'light',
        richColors: true,
        position: 'top-center',
        duration: 3000,
    } satisfies ToasterProps,
    /// locale default configuration
    locale: {
        locales: ['en', 'ar'],
        defaultLocale: 'ar',
        localePrefix: 'never',
    } satisfies LocaleSetting,
    grid: {
        1: '',
        2: 'sm:grid-cols-2 ',
        3: 'sm:grid-cols-2  md:grid-cols-3 md:gap-6',
        4: 'sm:grid-cols-2  md:grid-cols-4 md:gap-6',
        5: 'sm:grid-cols-2  md:grid-cols-4 md:gap-6 lg:grid-cols-5',
        6: 'sm:grid-cols-2  md:grid-cols-4 md:gap-6 lg:grid-cols-6',
        7: 'sm:grid-cols-2  md:grid-cols-4 md:gap-6 lg:grid-cols-7',
        8: 'sm:grid-cols-2  md:grid-cols-4 md:gap-6 lg:grid-cols-8',
        9: 'sm:grid-cols-2  md:grid-cols-4 md:gap-6 lg:grid-cols-9',
    } satisfies Record<ColsType, string>,
    span: {
        1: ' md:col-span-1',
        2: ' md:col-span-2',
        3: ' md:col-span-3',
        4: ' md:col-span-4',
        5: ' md:col-span-5',
        6: ' md:col-span-6',
        7: ' md:col-span-7',
        8: ' md:col-span-8',
        9: ' md:col-span-9',
        10: ' md:col-span-10',
        11: ' md:col-span-11',
        12: ' md:col-span-12',
    } satisfies Record<SpanType, string>,
};
