import { RouteProps, Routes } from '@/constants/route';

export type NavListType = RouteProps & {
    subMenu?: RouteProps[];
};
export const NavList: NavListType[] = [
    { ...Routes.dashboard },
    {
        title: 'users',
        icon: Routes.users.icon,
        id: '111',
        url: Routes.users.url,
        subMenu: [
            { ...Routes.users },
            { ...Routes.drivers },
            { ...Routes.owners },
            { ...Routes.agencies },
            { ...Routes.clients },
        ],
    },
    { ...Routes.trucks },
    { ...Routes.trailers },
    { ...Routes.request },
];
