'use client';

import { DeleteUser } from '@/api-service/data-service/UserService';
import AKDialog from '@/components/my-components/AKDialog';
import { DashboardTitle } from '@/components/my-components/module/DashboardTitle';
import ModuleActionSection from '@/components/my-components/module/ModuleActionSection';
import {
    ModuleContainer,
    ModuleTableContainer,
} from '@/components/my-components/module/ModuleContainer';
import { BasicTable } from '@/components/my-components/table/BasicTable';
import { useEntityActions } from '@/hooks/useEntityActions';
import { useModuleState } from '@/hooks/useModuleState';
import { useQueryState } from '@/hooks/useQueryState';
import { useDialog } from '@/providers/DialogProvider';
import { DialogType } from '@/types/dialog';
import { UserSchema } from '@/types/schema';
import { UseGetTableResponseType } from '@/types/ui';
import { UseQueryResult } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { lazy, ReactNode, useCallback } from 'react';

const ModalContent = lazy(() => import('@/components/my-components/module/ModalContent'));

const UserData = ({
    columns,
    queryState: { dateFrom, dateTo, setDateFrom, setDateTo, tableProps, selected },
    moduleState: { openFilter, setOpenFilter, loading },
    userData: { data, isLoading, refetch },
    customFilter,
    reset,
    title,
    icon,
    newDialogType,
}: {
    columns: ColumnDef<UserSchema>[];
    queryState: ReturnType<typeof useQueryState<UserSchema>>;
    moduleState: ReturnType<typeof useModuleState>;
    userData: UseQueryResult<UseGetTableResponseType<UserSchema> | null>;
    customFilter: ReactNode;
    reset: () => void;
    title: string;
    icon: ReactNode;
    newDialogType?: DialogType | undefined;
}) => {
    const t = useTranslations();
    const { openDialog, dialogSize } = useDialog();

    const refetchData = useCallback(() => {
        refetch();
    }, [refetch]);

    const activeTable = {
        dateFrom,
        dateTo,
        setDateFrom,
        setDateTo,
        ...tableProps,
    };

    const deleteUser = DeleteUser();

    const { editEntity, moduleAction } = useEntityActions<UserSchema>({
        deleteEntityFn: deleteUser,
        successActions: [refetchData, reset],
        data: data?.data,
    });
    return (
        <ModuleContainer>
            <DashboardTitle title={title} icon={icon} />
            <ModuleTableContainer>
                <ModuleActionSection<UserSchema>
                    refetch={refetchData}
                    disabled={selected?.length <= 0}
                    loading={loading}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    reset={reset}
                    newDialogType={newDialogType}
                    newDialogSize='3xl'
                />
                <BasicTable
                    t={t}
                    loadingData={isLoading}
                    tableData={data}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    columns={columns}
                    {...activeTable}
                    customFilters={customFilter}
                />
                <AKDialog open={openDialog} size={dialogSize}>
                    <ModalContent data={editEntity} {...moduleAction} />
                </AKDialog>
            </ModuleTableContainer>
        </ModuleContainer>
    );
};

export default UserData;
