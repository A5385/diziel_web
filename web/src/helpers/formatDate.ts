import { format } from 'date-fns';

export const formatDate = (date: Date | string | null | undefined, timeZone?: string) => {
    if (!date) return '';

    try {
        const dateObj = new Date(date);

        // Handle invalid dates
        if (isNaN(dateObj.getTime())) return '';

        // Use toLocaleDateString with timezone support
        return format(date.toLocaleString(), 'dd/MM/yyy');
    } catch {
        return '';
    }
};
