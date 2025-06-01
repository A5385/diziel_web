'use client';

import AKDialog from '@/components/my-components/AKDialog';
import { dynamicOptions } from '@/helpers/DynamicImport';
import { useDialog } from '@/providers/DialogProvider';
import { TanstackTableProps } from '@/types/ui';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { BasicTable } from '../table/BasicTable';
import { DashboardTitle } from './DashboardTitle';
import { ActionSectionProps } from './ModuleActionSection';

const ModuleActionSection = dynamic(() => import('./ModuleActionSection'), {
    ...dynamicOptions,
});

// interface defaultState {
//     openDialog: boolean;
//     setOpenDialog: (openDialog: boolean) => void;

//     dialogType: DialogType;
//     setDialogType: (type: DialogType) => void;

//     editItemId: any;
//     setEditItemId: (editItemId: any) => void;

//     selectedId: string[];
//     setSelectedId: (editItemId: string[]) => void;
// }

type ModuleDataProps<TValue> = {
    title: string;
    icon: React.ReactNode;
    tableProps: TanstackTableProps<TValue>;
    archievedSectionProps: ActionSectionProps<TValue>;
    modelContent: React.ReactNode;
    customSection?: ReactNode;
};

const ModuleData = <TData,>({
    title,
    icon,
    tableProps,
    archievedSectionProps,
    modelContent,
    customSection,
}: ModuleDataProps<TData>) => {
    const { openDialog, dialogSize } = useDialog();

    return (
        <main className='space-y-4'>
            <DashboardTitle title={title} icon={icon} />
            <div className='w-full space-y-4 rounded-xl bg-white p-4 dark:bg-slate-600'>
                <ModuleActionSection {...archievedSectionProps} />
                <div className={'flex items-center justify-end gap-4'}>{customSection}</div>
                <BasicTable {...tableProps} />
                <AKDialog open={openDialog} size={dialogSize}>
                    {modelContent}
                </AKDialog>
            </div>
        </main>
    );
};

export default ModuleData;
