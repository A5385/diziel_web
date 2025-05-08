import { I18nService } from 'nestjs-i18n';
import { LocaleType } from 'src/types/response';

export type LocaleHelperType = {
    path: string;
    i18n?: I18nService<Record<string, unknown>>;
    locale?: LocaleType;
    args?: Record<string, string>;
};

export function localeHelper({ path, i18n, locale = 'en', args = {} }: LocaleHelperType) {
    return i18n?.t(`index.${path}`, { lang: locale, args });
}
