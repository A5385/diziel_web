'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { RefreshIcon } from '../../styles/icons';
import { AKButton } from '../my-components/AKButton';

export type RefreshButtonPropsType = {
    handleRefresh?: () => void;
};

export const RefreshDataButton: React.FC<RefreshButtonPropsType> = ({ handleRefresh }) => {
    const t = useTranslations();

    return (
        <AKButton
            type={'button'}
            onClick={handleRefresh}
            title={t('reload')}
            iconAfter={<RefreshIcon size={20} color={'white'} />}
        />
    );
};
