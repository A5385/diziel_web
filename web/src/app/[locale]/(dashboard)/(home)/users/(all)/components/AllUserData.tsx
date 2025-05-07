'use client';
import { GetAllUsers } from '@/api-service/data-service/UserService';
import { AKSelect } from '@/components/my-components/AKSelect';
import { Routes } from '@/constants/route';
import { formatDate } from '@/helpers/formatDate';
import { useModuleState } from '@/hooks/useModuleState';
import { useQueryState } from '@/hooks/useQueryState';
import { UserRole } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { roleList } from '../../components/role-list';
import UserData from '../../components/UserData';
import AllUserColumns from './AllUserColumns';

const AllUserData = () => {
    const t = useTranslations();
    const queryState = useQueryState<UserSchema>();
    const [role, setRole] = useState<UserRole | null>(null);

    const moduleState = useModuleState();

    const columns = AllUserColumns({
        ...queryState.columnsProps,
    });

    const userData = GetAllUsers({
        queryParams: {
            ...queryState.queryState,
            query: [
                { key: 'createFrom', value: formatDate(queryState.dateFrom) },
                { key: 'createTo', value: formatDate(queryState.dateTo) },
                { key: 'role', value: role ?? '' },
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
            title={Routes.users.title}
            icon={Routes.users.icon}
            columns={columns}
            queryState={queryState}
            moduleState={moduleState}
            userData={userData}
            reset={reset}
            newDialogType='new-user'
            customFilter={
                <AKSelect
                    name='role'
                    noSearch
                    label={t('role')}
                    onValueChange={(e) => setRole(e as UserRole)}
                    selectItems={roleList.map((item) => ({
                        label: t(item.toLowerCase()),
                        value: item,
                    }))}
                />
            }
        />
    );
};

export default AllUserData;
