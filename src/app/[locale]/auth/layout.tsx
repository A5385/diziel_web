import Logo from '@/components/layout/Logo';
import ToggleLocale from '@/components/layout/ToggleLocale';
import { ToggleTheme } from '@/components/layout/ToggleTheme';
import { ChildrenType } from '@/types/general';

const AuthLayout = ({ children }: ChildrenType) => {
    return (
        <div className='to-main from-sec h-screen w-full overflow-hidden bg-gradient-to-tr dark:from-teal-900 dark:to-teal-700'>
            <div className='mt-4 flex w-full items-center justify-between px-8'>
                <Logo />
                <div className='flex items-center gap-4'>
                    <ToggleLocale />
                    <ToggleTheme />
                </div>
            </div>
            <div className='flex h-full w-full flex-col items-center justify-center'>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
