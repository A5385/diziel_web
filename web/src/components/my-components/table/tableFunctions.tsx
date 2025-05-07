/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterFn, SortingFn } from '@tanstack/react-table';

export const getNestedValue = (obj: unknown, path: string): unknown => {
    const keys = path.split('.');
    let currentValues: unknown[] = [obj];

    for (const key of keys) {
        const nextValues: unknown[] = [];
        for (const value of currentValues) {
            if (Array.isArray(value)) {
                nextValues.push(...value.map((item) => getNestedValue(item, key)));
            } else if (value !== null && typeof value === 'object') {
                const nextValue = (value as Record<string, unknown>)[key];
                if (nextValue !== undefined) {
                    nextValues.push(nextValue);
                }
            } else {
                return undefined;
            }
        }
        currentValues = nextValues;
    }

    return currentValues.flat();
};

export const dynamicIncludesString: FilterFn<any> = (row, columnId, filterValue) => {
    const nestedValue = getNestedValue(row.original, columnId);
    if (typeof nestedValue === 'string') {
        return nestedValue.includes(filterValue);
    } else if (Array.isArray(nestedValue)) {
        return nestedValue.some((val) => val.includes(filterValue));
    }
    return false;
};

export const dynamicAlphanumeric: SortingFn<any> = (rowA, rowB, columnId) => {
    const valueA = getNestedValue(rowA.original, columnId) || '',
        valueB = getNestedValue(rowB.original, columnId) || '';
    return (valueA as string).localeCompare(valueB as string);
};
