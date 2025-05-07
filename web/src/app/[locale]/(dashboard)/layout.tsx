import { ChildrenType } from '@/types/general';
import DashboardHeader from './components/DashboardHeader';
import DashboardSidebar from './components/DashboardSidebar';
import ProtectionLayout from './components/ProtectionLayout';

const DashboardLayout = ({ children }: ChildrenType) => {
    return (
        <ProtectionLayout>
            <div className='flex h-screen w-full gap-4 overflow-hidden p-4'>
                <DashboardSidebar />
                <div className='flex w-full flex-col gap-4'>
                    <DashboardHeader />
                    <div className='h-full w-full overflow-auto rounded-2xl bg-slate-100 p-4 shadow-md dark:bg-slate-800'>
                        {children}
                    </div>
                </div>
            </div>
        </ProtectionLayout>
    );
};

export default DashboardLayout;
