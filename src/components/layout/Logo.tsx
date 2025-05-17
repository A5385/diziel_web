'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

const Logo = ({ width = 200, height = 50 }: { width?: number; height?: number }) => {
    const mobile = useIsMobile();
    return (
        <div className='relative overflow-hidden' style={{ width, height }}>
            <Image src='/logo/logo.png' alt='logo' fill sizes='100' objectFit='cover' priority />
        </div>
    );
};

export default Logo;
