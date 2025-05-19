'use client';

import { AKButton } from '@/components/my-components/AKButton';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { iconProps, RouteProps } from '@/constants/route';
import { useArabic } from '@/hooks/useArabic';
import { cn } from '@/lib/utils';
import { DashboardIcon } from '@radix-ui/react-icons';
import { ChevronRight, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement, ReactElement } from 'react';
import { NavList, NavListType } from './nav-list';

const MobileMenu = () => {
    const ar = useArabic();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='block md:hidden' asChild>
                <AKButton
                    variant={'outline'}
                    size='icon'
                    iconBefore={<DashboardIcon />}
                    type='button'
                    dir={ar ? 'rtl' : 'ltr'}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={'end'} className='flex flex-col md:hidden'>
                {NavList.map((nav) => {
                    if ('subMenu' in nav) {
                        return <MenuItemWithSubmenu nav={nav} key={nav.id} />;
                    } else {
                        return <MenuItem key={nav.id} nav={nav} />;
                    }
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MobileMenu;

const MenuItem = ({ nav }: { nav: RouteProps }) => {
    const ar = useArabic();
    const t = useTranslations();
    const pathname = usePathname();
    const activeNav = (url: string) => {
        if (url === '/' && pathname === '/') return true;
        else if (url !== '/' && pathname === url) return true;
        else return false;
    };

    const active = activeNav(nav.url);
    return (
        <DropdownMenuItem asChild key={nav.id}>
            <Link
                key={nav.id}
                href={nav.url}
                dir={ar ? 'rtl' : 'ltr'}
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
                        className={ar ? 'rotate-180' : ''}
                    />
                )}
            </Link>
        </DropdownMenuItem>
    );
};

const MenuItemWithSubmenu = ({ nav }: { nav: NavListType }) => {
    const pathname = usePathname();
    const t = useTranslations();
    const ar = useArabic();
    return (
        <Accordion key={nav.id} type='multiple'>
            <AccordionItem value={nav.title}>
                <AccordionTrigger
                    dir={ar ? 'rtl' : 'ltr'}
                    className={cn(
                        nav?.subMenu?.some((link) => pathname.includes(link?.url))
                            ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-700'
                            : 'hover:bg-blue-300',
                        'justify-between px-4',
                        'flex w-64 cursor-pointer items-center py-2 transition-all duration-300 ease-in-out',
                    )}
                >
                    <p className={'flex items-center gap-4'}>
                        {nav.icon}
                        {nav.title && t(nav.title)}
                    </p>

                    <PlusIcon size={iconProps.size} color={'white'} />
                </AccordionTrigger>
                <AccordionContent className='mt-2 pb-0'>
                    {nav?.subMenu?.map((menuItem) => (
                        <NavMenuItem key={menuItem.id} nav={menuItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

const NavMenuItem = ({ nav }: { nav: RouteProps }) => {
    const ar = useArabic();
    const t = useTranslations();
    const pathname = usePathname();
    const activeNav = (url: string) => {
        if (url === '/' && pathname === '/') return true;
        else if (url !== '/' && pathname === url) return true;
        else return false;
    };

    const active = activeNav(nav.url);
    return (
        <Link
            dir={ar ? 'rtl' : 'ltr'}
            key={nav.id}
            href={nav.url}
            className={cn(
                active ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-700' : 'hover:bg-blue-300',
                'justify-between px-4',
                'flex w-full items-center gap-4 py-2 transition-all duration-300 ease-in-out',
            )}
        >
            <p className={'flex items-center gap-4'}>
                {active
                    ? cloneElement(nav.icon as ReactElement<typeof iconProps>, {
                          color: 'white',
                      })
                    : nav.icon}
                {nav.title && t(nav.title)}
            </p>
            {active && (
                <ChevronRight
                    size={iconProps.size}
                    color={'white'}
                    className={ar ? 'rotate-180' : ''}
                />
            )}
        </Link>
    );
};
