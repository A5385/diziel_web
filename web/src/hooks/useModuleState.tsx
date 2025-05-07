'use client';
import { useState } from 'react';

export const useModuleState = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState(false);

    return {
        loading,
        setLoading,
        openFilter,
        setOpenFilter,
    };
};
