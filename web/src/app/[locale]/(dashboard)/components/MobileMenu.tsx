'use client';

import { AKButton } from '@/components/my-components/AKButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { iconProps } from '@/constants/route';
import { cn } from '@/lib/utils';
import { DashboardIcon } from '@radix-ui/react-icons';
import { ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement, ReactElement } from 'react';
import { NavList } from './nav-list';

const MobileMenu = () => {
    const t = useTranslations();
    const pathname = usePathname();
    const locale = useLocale();

    const activeNav = (url: string) => {
        if (url === '/' && pathname === '/') return true;
        else if (url !== '/' && pathname === url) return true;
        else return false;
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='block md:hidden' asChild>
                <AKButton variant={'outline'} size='icon' icon={<DashboardIcon />} type='button' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={locale === 'ar' ? 'end' : 'start'}>
                {NavList.map((nav) => {
                    const active = activeNav(nav.url);
                    return (
                        <DropdownMenuItem asChild key={nav.id}>
                            <Link
                                key={nav.id}
                                href={nav.url}
                                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                                className={cn(
                                    active
                                        ? 'rounded-lg bg-purple-500 text-white shadow-lg hover:bg-purple-700'
                                        : 'rounded-lg hover:bg-purple-300',

                                    'flex cursor-pointer items-center justify-between px-4 py-2 transition-all duration-300 ease-in-out',
                                )}
                            >
                                <p className={cn('flex items-center gap-4')}>
                                    {active
                                        ? cloneElement(nav.icon as ReactElement<typeof iconProps>, {
                                              color: 'white',
                                          })
                                        : nav.icon}
                                    {t(nav.title)}
                                </p>
                                {active && (
                                    <ChevronRight
                                        size={iconProps.size}
                                        color={'white'}
                                        className={locale === 'ar' ? 'rotate-180' : ''}
                                    />
                                )}
                            </Link>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileMenu;
