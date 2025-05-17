import { ColorType } from '@/types/ui';
import { LocalePrefix, LocalePrefixMode } from 'next-intl/routing';
import { ThemeProviderProps } from 'next-themes';
import { ToasterProps } from 'sonner';
import { ColsType, FormSettings, SpanType } from './types';

const AppConfig = {
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
        apiKey: 'x-api-key',
        lang: 'x-lang',
    },
    /// form default configuration
    form: {
        mode: 'onChange',
    } satisfies FormSettings,
    /// app default colors
    colors: {
        mainColor: '#4CB3CD',
        mainColorLight: '#62CFE8',
        secColor: '#3C5962',
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
        localePrefix: 'never' as LocalePrefix<string[], LocalePrefixMode> | undefined,
    },
    grid: {
        1: 'grid-cols-1', // Single column (full width)
        2: 'grid-cols-2', // 1 → 2 columns
        3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3', // 1 → 2 → 3
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', // 1 → 2 → 3 → 4
        5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5', // 1 → 2 → 3 → 5
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6', // 1 → 2 → 3 → 6
        7: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7', // 1 → 2 → 3 → 4 → 7
        8: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8', // 1 → 2 → 4 → 6 → 8
        9: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9', // 1 → 3 → 5 → 7 → 9
        10: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10', // 1 → 3 → 5 → 8 → 10
        11: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-11', // 1 → 3 → 6 → 9 → 11
        12: 'grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12', // 1 → 4 → 6 → 8 → 12
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
    color: {
        red: 'bg-red-500 hover:bg-red-700 text-white hover:text-white',
        orange: 'bg-orange-500  hover:bg-orange-700 text-white hover:text-white',
        gray: 'bg-gray-500 hover:bg-gray-700 text-white hover:text-white',
        green: 'bg-green-500 hover:bg-green-700 text-white hover:text-white',
        purple: 'bg-purple-500 hover:bg-purple-700 text-white hover:text-white',
        default: 'bg-main hover:bg-main-light hover:bg-sec text-white hover:text-white',
    } satisfies Record<ColorType, string>,
};

export default AppConfig;
