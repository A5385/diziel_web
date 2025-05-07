'use client';
import { GetAllUsers } from '@/api-service/data-service/UserService';
import { Routes } from '@/constants/route';
import { formatDate } from '@/helpers/formatDate';
import { useModuleState } from '@/hooks/useModuleState';
import { useQueryState } from '@/hooks/useQueryState';
import { UserRole } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { useCallback } from 'react';
import UserData from '../../components/UserData';
import DriversColumns from './DriversColumns';

const DriverData = () => {
    const queryState = useQueryState<UserSchema>();

    const moduleState = useModuleState();

    const columns = DriversColumns({
        ...queryState.columnsProps,
    });

    const userData = GetAllUsers({
        queryParams: {
            ...queryState.queryState,
            query: [
                { key: 'createFrom', value: formatDate(queryState.dateFrom) },
                { key: 'createTo', value: formatDate(queryState.dateTo) },
                { key: 'role', value: 'driver' as UserRole },
            ],
        },
    });

    const reset = useCallback(() => {
        queryState.resetState();
        queryState.setDateFrom(undefined);
        queryState.setDateTo(undefined);
    }, [queryState]);

    return (
        <UserData
            title={Routes.drivers.title}
            icon={Routes.drivers.icon}
            newDialogType='new-user'
            columns={columns}
            queryState={queryState}
            moduleState={moduleState}
            userData={userData}
            reset={reset}
            customFilter={<></>}
        />
    );
};

export default DriverData;
