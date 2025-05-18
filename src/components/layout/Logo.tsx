'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

const Logo = ({ width = 200, height = 50 }: { width?: number; height?: number }) => {
    const mobile = useIsMobile();
    return (
        <div
            className='relative overflow-hidden'
            style={{ width: mobile ? 50 : width, height: mobile ? 50 : height }}
        >
            <Image
                src={mobile ? '/logo/icon.png' : '/logo/logo.png'}
                alt='logo'
                fill
                sizes='100'
                priority
            />
        </div>
    );
};

export default Logo;
