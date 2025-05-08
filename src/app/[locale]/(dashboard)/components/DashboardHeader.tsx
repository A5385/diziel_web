import Logo from '@/components/layout/Logo';
import LogoutButton from '@/components/layout/LogoutButton';
import ToggleLocale from '@/components/layout/ToggleLocale';
import { ToggleTheme } from '@/components/layout/ToggleTheme';
import MobileMenu from './MobileMenu';
import SettingButton from './SettingButton';

const DashboardHeader = () => {
    return (
        <div className='flex items-center justify-between px-4 md:px-6'>
            <div className='flex items-center gap-4'>
                <MobileMenu />
                <Logo />
            </div>

            <div className='flex items-center gap-2'>
                <ToggleLocale />
                <ToggleTheme />
                <SettingButton />
                <LogoutButton />
            </div>
        </div>
    );
};

export default DashboardHeader;
