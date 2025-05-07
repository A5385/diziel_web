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
import ClientsColumns from './ClientsColumns';

const ClientsDataData = () => {
    const queryState = useQueryState<UserSchema>();

    const moduleState = useModuleState();

    const columns = ClientsColumns({
        ...queryState.columnsProps,
    });

    const userData = GetAllUsers({
        queryParams: {
            ...queryState.queryState,
            query: [
                { key: 'createFrom', value: formatDate(queryState.dateFrom) },
                { key: 'createTo', value: formatDate(queryState.dateTo) },
                { key: 'role', value: 'client' as UserRole },
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
            title={Routes.owners.title}
            icon={Routes.owners.icon}
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

export default ClientsDataData;
