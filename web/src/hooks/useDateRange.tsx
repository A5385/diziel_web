'use client';

import { AKDatePicker, AKDatePickerProps } from '../components/my-components/AKDatepicker';

export type DateRangeProps = {
    from: AKDatePickerProps;
    to: AKDatePickerProps;
    className?: string;
};

export const useDateRange = ({ from, to, className }: DateRangeProps) => {
    return (
        <>
            <AKDatePicker {...from} className={className} />
            <AKDatePicker {...to} className={className} />
        </>
    );
};
