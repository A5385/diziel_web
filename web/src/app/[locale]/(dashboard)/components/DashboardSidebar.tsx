'use client';
import { AKButton } from '@/components/my-components/AKButton';
import { iconProps } from '@/constants/route';
import { useArabic } from '@/hooks/useArabic';
import { cn } from '@/lib/utils';
import { DashboardIcon } from '@/styles/icons';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement, ReactElement, useState } from 'react';
import { NavList } from './nav-list';

const DashboardSidebar = () => {
    const pathname = usePathname();
    const t = useTranslations();

    const ar = useArabic();
    const [open, setOpen] = useState(true);

    const activeNav = (url: string) => {
        if (url === '/' && pathname === '/') return true;
        else if (url !== '/' && pathname === url) return true;
        else return false;
    };
    return (
        <div
            className={cn(
                open ? 'w-72' : 'w-12',
                'relative hidden h-full rounded-xl bg-slate-100 py-4 shadow-md transition-all duration-500 ease-in-out md:block dark:bg-slate-900',
            )}
        >
            <AKButton
                size={'icon'}
                variant={'ghost'}
                type='button'
                color='purple'
                className={cn(
                    ar ? '-left-4' : '-right-4',
                    'absolute bottom-[5%] flex flex-col items-center justify-center rounded-full shadow-md',
                )}
                icon={<DashboardIcon color='white' />}
                onClick={() => setOpen(!open)}
            />

            <div className='mt-10 flex w-full flex-col gap-4'>
                {NavList.map((nav) => {
                    const active = activeNav(nav.url);
                    return (
                        <Link
                            key={nav.id}
                            href={nav.url}
                            className={cn(
                                active
                                    ? 'bg-purple-500 text-white shadow-lg hover:bg-purple-700'
                                    : 'hover:bg-purple-300',
                                open ? 'justify-between px-4' : 'justify-center px-4',
                                'flex w-full items-center py-2 transition-all duration-300 ease-in-out',
                            )}
                        >
                            <p className={open ? 'flex items-center gap-4' : ''}>
                                {active
                                    ? cloneElement(nav.icon as ReactElement<typeof iconProps>, {
                                          color: 'white',
                                      })
                                    : nav.icon}
                                {open && t(nav.title)}
                            </p>
                            {active && open && (
                                <ChevronRight
                                    size={iconProps.size}
                                    color={'white'}
                                    className={ar ? 'rotate-180' : ''}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardSidebar;
