'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const ToggleLocale = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const mobile = useIsMobile();

    const title = {
        ar: mobile ? 'ع' : 'عربي',
        en: mobile ? 'E' : 'English',
    };
    return (
        <Link
            href={pathname.replace(/ar|en/g, '')}
            locale={locale === 'ar' ? 'en' : 'ar'}
            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        >
            {title[locale === 'ar' ? 'en' : 'ar']}
        </Link>
    );
};

export default ToggleLocale;
