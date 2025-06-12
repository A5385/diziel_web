import { DashboardIcon, RequestIcon, TrailerIcon, TruckIcon, UsersIcon } from '@/styles/icons';
import { UserRole } from '@/types/prisma';
import { Route } from 'next';
import { ReactNode } from 'react';
import AppConfig from './AppSettings';

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
    | 'clients'
    | 'verify-account'
    | 'verify-otp'
    | 'set-new-password';

export const iconProps = { size: 14, color: AppConfig.colors.secColor };

export interface RouteProps {
    id: string;
    title: string;
    url: Route;
    icon?: ReactNode;
    access?: UserRole[] | 'all';
}

export type RoutesPropsType = Record<RoutesType, RouteProps>;

export const Routes: RoutesPropsType = {
    ['dashboard']: {
        id: '1',
        title: 'dashboard',
        url: '/',
        icon: <DashboardIcon {...iconProps} />,
        access: 'all',
    },
    ['users']: {
        id: '2',
        title: 'all-users',
        url: '/users',
        icon: <UsersIcon {...iconProps} />,
        access: ['admin'],
    },
    ['drivers']: {
        id: '3',
        title: 'drivers',
        url: '/users/drivers',
        icon: <UsersIcon {...iconProps} />,
        access: ['admin'],
    },
    ['owners']: {
        id: '4',
        title: 'owners',
        url: '/users/owners',
        icon: <UsersIcon {...iconProps} />,
        access: ['admin'],
    },
    ['agencies']: {
        id: '5',
        title: 'agencies',
        url: '/users/agencies',
        icon: <UsersIcon {...iconProps} />,
        access: ['admin'],
    },
    ['clients']: {
        id: '6',
        title: 'clients',
        url: '/users/clients',
        icon: <UsersIcon {...iconProps} />,
        access: ['admin'],
    },
    ['trucks']: {
        id: '7',
        title: 'trucks',
        url: '/trucks',
        icon: <TruckIcon {...iconProps} />,
        access: 'all',
    },
    ['trailers']: {
        id: '8',
        title: 'trailers',
        url: '/trailers',
        icon: <TrailerIcon {...iconProps} />,
        access: 'all',
    },
    ['request']: {
        id: '9',
        title: 'requests',
        url: '/requests',
        icon: <RequestIcon {...iconProps} />,
        access: 'all',
    },

    ['login']: {
        id: '10',
        title: 'login',
        url: '/auth/login',
        access: 'all',
    },
    ['verify-account']: {
        id: '11',
        title: 'verify-account',
        url: '/auth/verify-account',
        access: 'all',
    },
    ['verify-otp']: {
        id: '12',
        title: 'verify-otp',
        url: '/auth/verify-otp',
        access: 'all',
    },
    ['set-new-password']: {
        id: '13',
        title: 'set-new-password',
        url: '/auth/set-new-password',
        access: 'all',
    },
};
