import React from 'react';
import { ResetIcon } from '../../styles/icons';
import { AKButton } from '../my-components/AKButton';

type RefetchDataType = {
    reset?: () => void;
    refetch?: () => void;
    hideResetIcon?: boolean;
};

export const ResetButton: React.FC<RefetchDataType> = ({ reset, hideResetIcon }) => {
    return (
        <AKButton
            type='button'
            size='icon'
            color='gray'
            onClick={reset}
            icon={hideResetIcon ? <></> : <ResetIcon size={20} />}
        />
    );
};
