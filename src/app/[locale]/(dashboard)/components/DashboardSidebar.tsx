'use client';
import { AKButton } from '@/components/my-components/AKButton';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { iconProps, RouteProps } from '@/constants/route';
import { useArabic } from '@/hooks/useArabic';
import { cn } from '@/lib/utils';
import { DashboardIcon } from '@/styles/icons';
import { ChevronRight, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement, ReactElement, useState } from 'react';
import { NavList, NavListType } from './nav-list';

const DashboardSidebar = () => {
    const ar = useArabic();
    const [open, setOpen] = useState(true);

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
                className={cn(
                    ar ? '-left-4' : '-right-4',
                    'absolute bottom-[3%] flex flex-col items-center justify-center rounded-full shadow-md',
                )}
                iconBefore={<DashboardIcon color='white' />}
                onClick={() => setOpen(!open)}
            />

            <div className='mt-10 flex w-full flex-col gap-4'>
                {NavList.map((nav) => {
                    if ('subMenu' in nav) {
                        return <NavMenuItemWithSubmenu key={nav.id} nav={nav} open={open} />;
                    } else {
                        return <NavMenuItem key={nav.id} nav={nav} open={open} />;
                    }
                })}
            </div>
        </div>
    );
};

export default DashboardSidebar;

const NavMenuItem = ({
    nav,
    open,
    className,
}: {
    nav: RouteProps;
    open: boolean;
    className?: string;
}) => {
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
            key={nav.id}
            href={nav.url}
            className={cn(
                className,
                active ? 'bg-main hover:bg-sec text-white shadow-lg' : 'hover:bg-sec',
                open ? 'justify-between px-4' : 'justify-center px-4',
                'flex w-full items-center py-2 text-base transition-all duration-300 ease-in-out',
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
};

export const NavMenuItemWithSubmenu = ({ nav, open }: { nav: NavListType; open: boolean }) => {
    const t = useTranslations();
    const pathname = usePathname();
    const active = nav?.subMenu?.some((link) => pathname.includes(link?.url));

    return (
        <Accordion key={nav.id} type='multiple'>
            <AccordionItem value={nav.title}>
                <AccordionTrigger
                    className={cn(
                        active ? 'bg-main hover:bg-sec text-white shadow-lg' : 'hover:bg-sec',
                        open ? 'justify-between px-4' : 'justify-center px-4',
                        'flex w-full cursor-pointer items-center py-2 text-base transition-all duration-300 ease-in-out',
                    )}
                >
                    <p className={open ? 'flex items-center gap-4' : ''}>
                        {nav.icon}
                        {open && nav.title && t(nav.title)}
                    </p>

                    <PlusIcon size={iconProps.size} color={'white'} />
                </AccordionTrigger>
                <AccordionContent className='mt-2 pb-0'>
                    {nav?.subMenu?.map((menuItem) => (
                        <NavMenuItem
                            key={menuItem.id}
                            nav={menuItem}
                            open={open}
                            className='!px-8'
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
