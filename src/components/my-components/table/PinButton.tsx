import { ColumnPinningState, Header } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { TiPin } from 'react-icons/ti';
export const PinButton = <TData,>({
    header,
    setColumnPinning,
}: {
    header: Header<TData, unknown>;
    setColumnPinning: Dispatch<SetStateAction<ColumnPinningState>>;
}) => {
    return (
        <TiPin
            color={header.column.getIsPinned() ? 'red' : 'gray'}
            size={16}
            onClick={() =>
                setColumnPinning((prev) => ({
                    ...prev,

                    left: prev.left?.includes(header.id)
                        ? prev?.left?.filter((id) => id !== header.id)
                        : [...(prev?.left || []), header.id],
                }))
            }
        />
    );
};
