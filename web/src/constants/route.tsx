import { DashboardIcon, RequestIcon, TrailerIcon, TruckIcon, UsersIcon } from '@/styles/icons';
import { Route } from 'next';
import { ReactNode } from 'react';

// 1. Enum for Route Keys
export enum RoutesEnum {
    DASHBOARD = 'dashboard',
    USERS = 'users',
    TRUCKS = 'truckS',
    TRAILERS = 'trailers',
    REQUEST = 'request',

    LOGIN = 'login',
    REGISTRATION = 'registration',
    VERIFY_EMAIL = 'verifyEmail',
    SET_PASSWORD = 'setPassword',
}

// 2. Default Icon Props
export const iconProps = { size: 14, color: 'purple' };

// 3. Route Type
export interface RouteProps {
    id: string;
    title: string;
    url: Route;
    icon?: ReactNode;
    access?: string[];
}

// 4. Routes Record Type
export type RoutesPropsType = Record<RoutesEnum, RouteProps>;

// 5. Centralized Routes Definition
export const Routes: RoutesPropsType = {
    [RoutesEnum.DASHBOARD]: {
        id: '1',
        title: 'dashboard',
        url: '/',
        icon: <DashboardIcon {...iconProps} />,
    },
    [RoutesEnum.USERS]: {
        id: '2',
        title: 'users',
        url: '/users',
        icon: <UsersIcon {...iconProps} />,
    },
    [RoutesEnum.TRUCKS]: {
        id: '3',
        title: 'trucks',
        url: '/trucks',
        icon: <TruckIcon {...iconProps} />,
    },
    [RoutesEnum.TRAILERS]: {
        id: '4',
        title: 'trailers',
        url: '/trailers',
        icon: <TrailerIcon  {...iconProps} />,
    },
    [RoutesEnum.REQUEST]: {
        id: '5',
        title: 'requests',
        url: '/requests',
        icon: <RequestIcon {...iconProps} />,
    },

    [RoutesEnum.LOGIN]: {
        id: '9',
        title: 'login',
        url: '/auth/login',
    },
    [RoutesEnum.REGISTRATION]: {
        id: '10',
        title: 'registration',
        url: '/auth/registration',
    },
    [RoutesEnum.VERIFY_EMAIL]: {
        id: '11',
        title: 'verifyEmail',
        url: '/auth/verify-email',
    },
    [RoutesEnum.SET_PASSWORD]: {
        id: '12',
        title: 'setPassword',
        url: '/auth/set-password',
    },
};

// 6. Dynamic Generator for Subset of Routes
export const GenerateRouterList = (routerList: RoutesEnum[]): RouteProps[] => {
    return routerList.map((routeKey) => Routes[routeKey]);
};
