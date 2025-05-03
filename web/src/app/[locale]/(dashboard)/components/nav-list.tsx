import { GenerateRouterList, RoutesEnum } from '@/constants/route';

export const NavList = GenerateRouterList([
    RoutesEnum.DASHBOARD,
    RoutesEnum.USERS,
    RoutesEnum.TRUCKS,
    RoutesEnum.TRAILERS,
    RoutesEnum.REQUEST,
]);
