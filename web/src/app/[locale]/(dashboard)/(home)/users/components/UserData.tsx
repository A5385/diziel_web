'use client';

import { DeleteUser, GetAllUsers } from '@/api-service/data-service/UserService';
import AKDialog from '@/components/my-components/AKDialog';
import { AKSelect } from '@/components/my-components/AKSelect';
import { DashboardTitle } from '@/components/my-components/module/DashboardTitle';
import ModuleActionSection from '@/components/my-components/module/ModuleActionSection';
import {
    ModuleContainer,
    ModuleTableContainer,
} from '@/components/my-components/module/ModuleContainer';
import { BasicTable } from '@/components/my-components/table/BasicTable';
import { Routes } from '@/constants/route';
import { formatDate } from '@/helpers/formatDate';
import { useEntityActions } from '@/hooks/useEntityActions';
import { useModuleState } from '@/hooks/useModuleState';
import { useQueryState } from '@/hooks/useQueryState';
import { useDialog } from '@/providers/DialogProvider';
import { UserRole } from '@/types/prisma';
import { UserSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { lazy, useCallback, useState } from 'react';
import { roleList } from './role-list';
import UserColumns from './UserColumns';

const ModuleModal = lazy(() => import('@/components/my-components/module/ModuleModal'));

const UserData = () => {
    const t = useTranslations();
    const { openDialog, dialogSize } = useDialog();
    const activeState = useQueryState<UserSchema>();
    const {
        loading,
        setLoading,
        openFilter,
        setOpenFilter,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
    } = useModuleState();

    const [role, setRole] = useState<UserRole | null>(null);

    const resetState = useCallback(() => {
        activeState.resetState();
        setDateFrom(undefined);
        setDateTo(undefined);
        setRole(null);
    }, [activeState, setDateFrom, setDateTo]);
    const {
        data: activeData,
        refetch: refetchActive,
        isLoading: loadingActiveData,
    } = GetAllUsers({
        queryParams: {
            ...activeState.queryState,
            query: [
                { key: 'createFrom', value: formatDate(dateFrom) },
                { key: 'createTo', value: formatDate(dateTo) },
                { key: 'role', value: role ?? '' },
            ],
        },
    });
    const refetchData = useCallback(() => {
        refetchActive();
    }, [refetchActive]);

    const activeColumns = UserColumns({
        ...activeState.columnsProps,
    });

    const activeTable = {
        dateFrom,
        dateTo,
        setDateFrom,
        setDateTo,
        columns: activeColumns,
        ...activeState.tableProps,
    };

    const deleteUser = DeleteUser();

    const { editEntity, moduleAction } = useEntityActions<UserSchema>({
        deleteEntityFn: deleteUser,
        successActions: [refetchData, resetState],
        data: activeData?.data,
    });
    return (
        <ModuleContainer>
            <DashboardTitle title={Routes.users.title} icon={Routes.users.icon} />
            <ModuleTableContainer>
                <ModuleActionSection<UserSchema>
                    refetch={refetchData}
                    disabled={activeState?.selected?.length <= 0}
                    loading={loading}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    reset={resetState}
                    newDialogType='new-user'
                />
                <BasicTable
                    t={t}
                    loadingData={loadingActiveData}
                    tableData={activeData}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    {...activeTable}
                    customFilters={
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
                <AKDialog open={openDialog} size={dialogSize}>
                    <ModuleModal data={editEntity} {...moduleAction} />
                </AKDialog>
            </ModuleTableContainer>
        </ModuleContainer>
    );
};

export default UserData;
