import { Dispatch, SetStateAction } from 'react';

export type DialogOpenType = (props: HandleDialogPropsType) => void;

type EditItemIdType = string | null;

export type DialogStateType = {
    // dialog props
    openDialog: boolean;
    dialogType?: DialogType | null;
    editItemId?: EditItemIdType;
    dialogSize?: DialogSizeType;
    selectedId?: string[];
};

export type DialogContextProps = DialogStateType & {
    setDialogState: Dispatch<SetStateAction<DialogStateType>>;
    handleOpenDialog: DialogOpenType;
    handleCloseDialog: () => void;
};
export type HandleDialogPropsType = Omit<
    DialogStateType,
    'openDialog' | 'editItemId' | 'editItemId'
> & {
    itemId?: string;
    type: DialogType;
};

export type DialogSizeType =
    | 'default'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full';

export type DialogType =
    | ''
    | 'delete'
    | 'delete-many'
    | 'new-user'
    | 'edit-user'
    | 'new-truck'
    | 'edit-truck';
