'use client';

import { useSession } from '@/api-service/data-service/AuthService';
import { DeleteRequest, GetAllRequests } from '@/api-service/data-service/RequestService';
import { DashboardTitle } from '@/components/my-components/module/DashboardTitle';
import ModuleActionSection from '@/components/my-components/module/ModuleActionSection';
import {
    ModuleContainer,
    ModuleTableContainer,
} from '@/components/my-components/module/ModuleContainer';
import { BasicTable } from '@/components/my-components/table/BasicTable';
import { Routes } from '@/constants/route';
import { dynamicOptions } from '@/helpers/DynamicImport';
import { formatDate } from '@/helpers/formatDate';
import { useEntityActions } from '@/hooks/useEntityActions';
import { useModuleState } from '@/hooks/useModuleState';
import { useQueryState } from '@/hooks/useQueryState';
import { useDialog } from '@/providers/DialogProvider';
import { RequestSchema } from '@/types/schema';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import RequestColumns from './RequestColumns';

const AKDialog = dynamic(() => import('@/components/my-components/AKDialog'), {
    ...dynamicOptions,
});
const ModalContent = dynamic(() => import('@/components/my-components/module/ModalContent'), {
    ...dynamicOptions,
});

const RequestData = () => {
    const t = useTranslations();
    const role = useSession().data?.role;
    const { openDialog, dialogSize } = useDialog();
    const states = useQueryState<RequestSchema>();
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
    } = GetAllRequests({
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

    const activeColumns = RequestColumns({
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

    const deleteRequest = DeleteRequest();

    const { editEntity, moduleAction } = useEntityActions<RequestSchema>({
        deleteEntityFn: deleteRequest,
        successActions: [refetchData, resetState],
        data: activeData?.data,
    });
    return (
        <ModuleContainer>
            <DashboardTitle title={Routes.request.title} icon={Routes.request.icon} />
            <ModuleTableContainer>
                <ModuleActionSection<RequestSchema>
                    refetch={refetchData}
                    disabled={states?.selected?.length <= 0}
                    loading={loading}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    reset={resetState}
                    newDialogType='new-request'
                    disableAddNew={role && !['agency', 'client'].includes(role)}
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

export default RequestData;
