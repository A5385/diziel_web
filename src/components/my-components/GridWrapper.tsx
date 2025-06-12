import constants from '@/constants/AppSettings';
import { ColsType } from '@/constants/types';
import { useArabic } from '@/hooks/useArabic';
import { cn } from '@/lib/utils';
import { ChildrenType } from '@/types/general';
import { useTranslations } from 'next-intl';

const GridWrapper = ({
    children,
    cols = 1,
    className,
    title,
}: ChildrenType & { cols?: ColsType; className?: string; title?: string }) => {
    const isArabic = useArabic();
    const t = useTranslations();
    return (
        <div
            className={cn(
                className,
                title && 'relative mt-2 rounded-xl border p-4',
                'grid gap-4',
                constants.grid[cols],
            )}
        >
            {title && (
                <p className={cn(isArabic ? 'right-5' : 'left-5', 'absolute -top-3')}>{t(title)}</p>
            )}
            {children}
        </div>
    );
};

export default GridWrapper;
