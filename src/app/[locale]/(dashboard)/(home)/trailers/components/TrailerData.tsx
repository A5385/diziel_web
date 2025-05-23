'use client';

import { DeleteTrailer, GetAllTrailers } from '@/api-service/data-service/TrailerService';
import AKDialog from '@/components/my-components/AKDialog';
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
import { TrailerSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import { lazy, useCallback } from 'react';
import TrailerColumns from './TrailerColumns';

const ModalContent = lazy(() => import('@/components/my-components/module/ModalContent'));

const TrailerData = () => {
    const t = useTranslations();
    const { openDialog, dialogSize } = useDialog();
    const states = useQueryState<TrailerSchema>();
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
    } = GetAllTrailers({
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

    const activeColumns = TrailerColumns({
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

    const delTrailer = DeleteTrailer();

    const { editEntity, moduleAction } = useEntityActions<TrailerSchema>({
        deleteEntityFn: delTrailer,
        successActions: [refetchData, resetState],
        data: activeData?.data,
    });
    return (
        <ModuleContainer>
            <DashboardTitle title={Routes.trailers.title} icon={Routes.trailers.icon} />
            <ModuleTableContainer>
                <ModuleActionSection<TrailerSchema>
                    refetch={refetchData}
                    disabled={states?.selected?.length <= 0}
                    loading={loading}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    reset={resetState}
                    newDialogType='new-trailer'
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
                    <ModalContent data={editEntity} {...moduleAction} />
                </AKDialog>
            </ModuleTableContainer>
        </ModuleContainer>
    );
};

export default TrailerData;
