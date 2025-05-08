// api/src/config/locale.config.ts
import { HeaderResolver } from 'nestjs-i18n';
import { join } from 'path';
import { localeKey } from 'src/decorator/get-locale.decorator';

export const localeConfig = {
    useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
            path: join(process.cwd(), 'src', 'i18n'), // ✅ important
            watch: true,
        },
        typesOutputPath: join(process.cwd(), 'src', 'generated', 'i18n.generated.ts'),
    }),
    resolvers: [new HeaderResolver([localeKey])],
};
