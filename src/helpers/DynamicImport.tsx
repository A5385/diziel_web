import AppConfig from '@/constants/AppSettings';
import { DynamicOptions } from 'next/dynamic';
import { MoonLoader } from 'react-spinners';

export const dynamicOptions = {
    loading: ({ isLoading, error }) => {
        if (isLoading)
            return (
                <div className='fixed top-0 left-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white/50'>
                    <div className='flex size-20 items-center justify-center rounded-full bg-white shadow-lg'>
                        <MoonLoader color={AppConfig.colors.mainColor} size={'30'} />
                    </div>
                </div>
            );
        if (error) return <div>Error loading component</div>;
        return null;
    },
    ssr: false,
} satisfies DynamicOptions;
