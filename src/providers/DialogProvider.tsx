'use client';

import useQueryParams from '@/hooks/use-query-param';
import { DialogContextProps, DialogStateType, HandleDialogPropsType } from '@/types/dialog';
import React, { ReactNode, useCallback, useMemo } from 'react';

const DialogContext = React.createContext<DialogContextProps | null>(null);

// defaults if no query-string present
const defaultState: DialogStateType = {
    openDialog: false,
    dialogType: null,
    editItemId: null,
    dialogSize: 'md',
    selectedId: [],
};

const QUERY_KEYS = {
    open: 'modal', // boolean flag – presence of key is enough
    type: 'dialogType', //  e.g. "delete"
    id: 'itemId', //  editItemId
    size: 'size', //  "sm" | "md" | "lg"
    sel: 'sel', //  selectedId list -> csv string
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
    const { updateSearch, getParam, resetUrl } = useQueryParams();

    /* ────────────────────── derive state from URL ────────────────────── */
    const dialogState: DialogStateType = useMemo(() => {
        if (!getParam(QUERY_KEYS.open)) return defaultState;

        return {
            openDialog: true,
            dialogType: (getParam(QUERY_KEYS.type) as DialogStateType['dialogType']) ?? null,
            editItemId: getParam(QUERY_KEYS.id),
            dialogSize: (getParam(QUERY_KEYS.size) as DialogStateType['dialogSize']) ?? 'md',
            selectedId: getParam(QUERY_KEYS.sel)?.split(',') ?? [],
        };
    }, [getParam]);

    const handleOpenDialog = useCallback(
        ({ type, itemId, selectedId = [], dialogSize }: HandleDialogPropsType) => {
            updateSearch((p) => {
                p.set(QUERY_KEYS.open, '1');
                p.set(QUERY_KEYS.type, type);
                if (itemId) p.set(QUERY_KEYS.id, itemId);
                else p.delete(QUERY_KEYS.id);

                if (selectedId.length) p.set(QUERY_KEYS.sel, selectedId.join(','));
                else p.delete(QUERY_KEYS.sel);

                p.set(QUERY_KEYS.size, dialogSize ?? 'md');
            });
        },
        [updateSearch],
    );

    const handleCloseDialog = useCallback(() => {
        resetUrl();
    }, [resetUrl]);

    /* ───────────────────────── provider value ────────────────────────── */
    const value: DialogContextProps = {
        ...dialogState,
        setDialogState: () => {
            /* no-op – no direct set, we mutate via URL */
            console.warn('setDialogState is disabled when using URL-driven dialogs.');
        },
        handleOpenDialog,
        handleCloseDialog,
    };

    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

/* hook stays identical */
export const useDialog = (): DialogContextProps => {
    const ctx = React.useContext(DialogContext);
    if (!ctx) throw new Error('useDialog must be used within a DialogProvider');
    return ctx;
};
