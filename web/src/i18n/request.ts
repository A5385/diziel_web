import { LocaleType } from '@/constants/types';
import deepmerge from 'deepmerge';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const messageImports = {
    en: () => import('../../messages/en.json'),
    ar: () => import('../../messages/ar.json'),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = (await requestLocale) as keyof typeof messageImports;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as LocaleType)) {
        locale = routing.defaultLocale;
    }

    // Load the default messages (in this case, English messages)
    const defaultMessages = (await messageImports.en()).default;

    // Load the user-specific locale messages (e.g., 'en' or 'ar')
    const userMessages = (await messageImports[locale]()).default;

    // Merge the user messages with the default messages (deep merging)
    const messages = deepmerge(defaultMessages, userMessages as typeof defaultMessages);

    return {
        locale,
        messages,
    };
});
