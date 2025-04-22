'use client';
import { DialogContextProps, DialogStateType, HandleDialogPropsType } from '@/types/dialog';
import React from 'react';

const DialogContext = React.createContext<DialogContextProps | null>(null);

const defaultDialogState: DialogStateType = {
    openDialog: false,
    dialogType: null,
    editItemId: null,
    dialogSize: 'md',
    selectedId: [],
};

const DialogProvider = ({
    children,
}: // modal,
{
    children: React.ReactNode;
    // modal: React.ReactNode;
}) => {
    const [dialogState, setDialogState] = React.useState<DialogStateType>(defaultDialogState);

    const handleOpenDialog = React.useCallback(
        ({ type, itemId, selectedId = [], dialogSize }: HandleDialogPropsType) => {
            setDialogState({
                openDialog: true,
                dialogType: type,
                editItemId: itemId,
                selectedId,
                dialogSize: dialogSize ?? 'md',
            });
        },
        [],
    );

    const handleCloseDialog = React.useCallback(() => {
        setDialogState(defaultDialogState);
    }, []);

    return (
        <DialogContext.Provider
            value={{
                ...dialogState,
                setDialogState,
                handleOpenDialog,
                handleCloseDialog,
            }}
        >
            {children}
            {/* <DialogComponent modal={modal} /> */}
        </DialogContext.Provider>
    );
};

const useDialog = (): DialogContextProps => {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

export { DialogProvider, useDialog };
