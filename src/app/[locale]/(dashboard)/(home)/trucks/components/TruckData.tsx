'use client';

import { DeleteTruck, GetAllTrucks } from '@/api-service/data-service/TruckService';
import AKDialog from '@/components/my-components/AKDialog';
import { DashboardTitle } from '@/components/my-components/module/DashboardTitle';
import ModuleActionSection from '@/components/my-components/module/ModuleActionSection';
import {
    ModuleContainer,
    ModuleTableContainer,
} from '@/components/my-components/module/ModuleContainer';
import ModuleModal from '@/components/my-components/module/ModuleModal';
import { BasicTable } from '@/components/my-components/table/BasicTable';
import { Routes } from '@/constants/route';
import { formatDate } from '@/helpers/formatDate';
import { useEntityActions } from '@/hooks/useEntityActions';
import { useModuleState } from '@/hooks/useModuleState';
import { useQueryState } from '@/hooks/useQueryState';
import { useDialog } from '@/providers/DialogProvider';
import { TruckSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import TruckColumns from './TruckColumns';

const TruckData = () => {
    const t = useTranslations();
    const { openDialog, dialogSize } = useDialog();
    const states = useQueryState<TruckSchema>();
    const { loading, setLoading, openFilter, setOpenFilter } = useModuleState();

    const resetState = useCallback(() => {
        states.resetState();
        states.setDateFrom(undefined);
        states.setDateTo(undefined);
    }, [states]);

    const {
        data: activeData,
        refetch: refetchActive,
        isLoading: loadingActiveData,
    } = GetAllTrucks({
        queryParams: {
            ...states.queryState,
            query: [
                { key: 'createFrom', value: formatDate(states.dateFrom) },
                { key: 'createTo', value: formatDate(states.dateTo) },
            ],
        },
    });
    const refetchData = useCallback(() => {
        refetchActive();
    }, [refetchActive]);

    const activeColumns = TruckColumns({
        ...states.columnsProps,
    });

    const activeTable = {
        dateFrom: states.dateFrom,
        dateTo: states?.dateTo,
        setDateFrom: states?.setDateFrom,
        setDateTo: states?.setDateTo,
        columns: activeColumns,
        ...states.tableProps,
    };

    const deleteTruck = DeleteTruck();

    const { editEntity, moduleAction } = useEntityActions<TruckSchema>({
        deleteEntityFn: deleteTruck,
        successActions: [refetchData, resetState],
        data: activeData?.data,
    });
    return (
        <ModuleContainer>
            <DashboardTitle title={Routes.trucks.title} icon={Routes.trucks.icon} />
            <ModuleTableContainer>
                <ModuleActionSection<TruckSchema>
                    refetch={refetchData}
                    disabled={states?.selected?.length <= 0}
                    loading={loading}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    reset={resetState}
                    newDialogType='new-truck'
                />
                <BasicTable
                    t={t}
                    loadingData={loadingActiveData}
                    tableData={activeData}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    {...activeTable}
                />
                <AKDialog open={openDialog} size={dialogSize}>
                    <ModuleModal data={editEntity} {...moduleAction} />
                </AKDialog>
            </ModuleTableContainer>
        </ModuleContainer>
    );
};

export default TruckData;
