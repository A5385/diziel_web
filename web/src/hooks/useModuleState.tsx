'use client';
import { useState } from 'react';

export const useModuleState = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [dateFrom, setDateFrom] = useState<Date>();
    const [dateTo, setDateTo] = useState<Date>();
    return {
        loading,
        setLoading,
        openFilter,
        setOpenFilter,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
    };
};
