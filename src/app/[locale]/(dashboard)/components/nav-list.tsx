import { RouteProps, Routes } from '@/constants/route';

export type NavListType = RouteProps & {
    subMenu?: RouteProps[];
};
export const NavList: NavListType[] = [
    { ...Routes.dashboard },
    {
        ...Routes.users,
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
