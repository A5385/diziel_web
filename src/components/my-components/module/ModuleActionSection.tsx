'use client';
import { cn } from '@/lib/utils';
import { useDialog } from '@/providers/DialogProvider';
import { AddNewIcon, ExportIcon, ResetIcon } from '@/styles/icons';
import { DialogSizeType, DialogType } from '@/types/dialog';
import { onClickBtnType, SetStateType } from '@/types/ui';
import { FilterIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { AKButton } from '../../my-components/AKButton';
// import { ImportButton } from '../../my-components/file-import/ImportButton';
import AppConfig from '@/constants/AppSettings';
import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { RefreshDataButton } from '../RefreshDataButton';

export type ActionSectionProps<T> = {
    refetch?: () => void;
    impX?: {
        data: T[];
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
        resetFileInput: () => void;
        key: number;
        tempLink: string;
    };
    handleExport?: (type: 'excel' | 'pdf') => void;
    handleImport?: () => Promise<void>;
    loading?: boolean;
    openImport?: boolean;
    setOpenImport?: SetStateType<boolean>;
    extraElement?: ReactNode;
    children?: ReactNode;
    reset?: () => void;
    openFilter?: boolean;
    disableAddNew?: boolean;
    setOpenFilter?: Dispatch<SetStateAction<boolean>>;
    confirmActivateMany?: onClickBtnType;
    hideDeleteMany?: boolean;
    hideSuspendMany?: boolean;
    archiveDialogType?: DialogType;
    archiveDialogSize?: DialogSizeType;
    newDialogType?: DialogType;
    newDialogSize?: DialogSizeType;
    entityId?: string;
    disabled?: boolean;
};

const iconProps = {
    size: 20,
    color: 'white',
};

const ModuleActionSection = <T,>({
    refetch,
    // impX,
    // handleImport,
    handleExport,
    // loading,
    // openImport,
    // setOpenImport,
    // archiveDialogType,
    // archiveDialogSize = '7xl',
    newDialogType,
    newDialogSize = '5xl',
    // extraElement,
    children,
    disableAddNew: disableAddNew,
    reset,
    openFilter,
    setOpenFilter,
    // hideDeleteMany,
    // hideSuspendMany,
    entityId,
}: // disabled,
ActionSectionProps<T>) => {
    const g = useTranslations();
    const { handleOpenDialog } = useDialog();
    const color = AppConfig.color['default'];
    return (
        <section className='flex flex-wrap items-center justify-evenly gap-4 px-8 md:justify-between md:px-0'>
            <div className='flex items-center gap-4'>
                <AKButton
                    size='icon'
                    type='button'
                    // variant={'outline'}
                    iconBefore={<FilterIcon {...iconProps} />}
                    color='gray'
                    onClick={() => setOpenFilter?.(!openFilter)}
                />
                {reset && (
                    <AKButton
                        size='icon'
                        type='button'
                        iconBefore={<ResetIcon {...iconProps} />}
                        onClick={reset}
                    />
                )}
                {children}
                {/* {!hideDeleteMany && (
                    <AKButton
                        size='icon'
                        type='button'
                        color='red'
                        disabled={disabled}
                        icon={<DeleteIcon{...iconProps} />}
                        onClick={() =>
                            handleOpenDialog({
                                type: 'delete-many',
                                dialogSize: 'sm',
                            })
                        }
                    />
                )}
                {!hideSuspendMany && (
                    <AKButton
                        size='icon'
                        type='button'
                        color='orange'
                        disabled={disabled}
                        icon={<PauseIcon size={20} />}
                        onClick={() =>
                            handleOpenDialog({
                                type: 'suspend-many',
                                dialogSize: 'sm',
                            })
                        }
                    />
                )} */}
                {/* {archiveDialogType && (
                    <AKButton
                        type='button'
                        color='gray'
                        size='icon'
                        onClick={() =>
                            handleOpenDialog({
                                type: archiveDialogType,
                                dialogSize: archiveDialogSize,
                            })
                        }
                        iconAfter={<ArchievedIcon {...iconProps} />}
                    />
                )} */}
            </div>
            <div className='flex items-center gap-4'>
                {refetch && <RefreshDataButton handleRefresh={refetch} />}
                {/* {impX && (
                    <ImportButton
                        saveFn={handleImport}
                        loading={loading}
                        setOpenImport={setOpenImport}
                        openImport={openImport}
                        extraElement={extraElement}
                        data={impX.data}
                        onChange={impX.onChange}
                        resetFileInput={impX.resetFileInput}
                        key={impX.key}
                        tempLink={impX.tempLink}
                    />
                )} */}
                {handleExport && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={cn(color, 'flex items-center gap-2')}>
                                <span className='hidden md:block'>{g('export')}</span>
                                <ExportIcon {...iconProps} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => handleExport && handleExport('excel')}
                            >
                                {g('excel')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => handleExport && handleExport('pdf')}
                            >
                                {g('pdf')}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
                {newDialogType && (
                    <AKButton
                        type='button'
                        onClick={() =>
                            handleOpenDialog({
                                type: newDialogType,
                                dialogSize: newDialogSize,
                                itemId: entityId,
                            })
                        }
                        disabled={disableAddNew}
                        title={g('add-new')}
                        iconAfter={<AddNewIcon {...iconProps} />}
                    />
                )}
            </div>
        </section>
    );
};

export default ModuleActionSection;
