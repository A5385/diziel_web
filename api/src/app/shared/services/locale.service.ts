import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { localeHelper, LocaleHelperType } from 'src/helper/locale-helper';

@Injectable()
export class TranslateService {
    constructor(private readonly i18n: I18nService) {}

    translate(props: LocaleHelperType): string | undefined {
        return localeHelper(props);
    }
}
