import { DashboardIcon, RequestIcon, TrailerIcon, TruckIcon, UsersIcon } from '@/styles/icons';
import { Route } from 'next';
import { ReactNode } from 'react';

export type RoutesType =
    | 'dashboard'
    | 'users'
    | 'trucks'
    | 'trailers'
    | 'request'
    | 'login'
    | 'drivers'
    | 'owners'
    | 'agencies'
    | 'clients';

export const iconProps = { size: 14, color: '#1447e6' };

export interface RouteProps {
    id: string;
    title: string;
    url: Route;
    icon?: ReactNode;
    access?: string[];
}

export type RoutesPropsType = Record<RoutesType, RouteProps>;

export const Routes: RoutesPropsType = {
    ['dashboard']: {
        id: '1',
        title: 'dashboard',
        url: '/',
        icon: <DashboardIcon {...iconProps} />,
    },
    ['users']: {
        id: '2',
        title: 'all-users',
        url: '/users',
        icon: <UsersIcon {...iconProps} />,
    },
    ['drivers']: {
        id: '3',
        title: 'drivers',
        url: '/users/drivers',
        icon: <UsersIcon {...iconProps} />,
    },
    ['owners']: {
        id: '4',
        title: 'owners',
        url: '/users/owners',
        icon: <UsersIcon {...iconProps} />,
    },
    ['agencies']: {
        id: '5',
        title: 'agencies',
        url: '/users/agencies',
        icon: <UsersIcon {...iconProps} />,
    },
    ['clients']: {
        id: '6',
        title: 'clients',
        url: '/users/clients',
        icon: <UsersIcon {...iconProps} />,
    },
    ['trucks']: {
        id: '7',
        title: 'trucks',
        url: '/trucks',
        icon: <TruckIcon {...iconProps} />,
    },
    ['trailers']: {
        id: '8',
        title: 'trailers',
        url: '/trailers',
        icon: <TrailerIcon {...iconProps} />,
    },
    ['request']: {
        id: '9',
        title: 'requests',
        url: '/requests',
        icon: <RequestIcon {...iconProps} />,
    },

    ['login']: {
        id: '10',
        title: 'login',
        url: '/auth/login',
    },
};
