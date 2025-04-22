'use client';

import constants from '@/constants/constants';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Logo = () => {
    const mobile = useIsMobile();
    return (
        <h2
            className={cn(
                mobile
                    ? 'flex aspect-square h-8 w-8 flex-col items-center justify-center rounded-full'
                    : 'rounded-xl p-2',
                'bg-slate-500 font-semibold text-white uppercase',
            )}
        >
            {mobile ? 'F' : constants.settings.title}
        </h2>
    );
};

export default Logo;
