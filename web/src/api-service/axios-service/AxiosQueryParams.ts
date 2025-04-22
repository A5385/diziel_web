import { ColumnFiltersState, SortingState } from '@tanstack/react-table';

export const buildQueryParams = (
    pagination?: { pageIndex?: number; pageSize?: number },
    filters?: ColumnFiltersState,
    sortBy?: SortingState,
    query?: { key: string; value: string }[],
): string => {
    const params = new URLSearchParams();

    // Handle pagination
    if (pagination) {
        if (pagination.pageIndex !== undefined) {
            params.set('page', String(pagination.pageIndex + 1)); // Convert to 1-based page indexing
        }
        if (pagination.pageSize !== undefined) {
            params.set('limit', String(pagination.pageSize));
        }
    }

    // Handle filters
    if (filters) {
        filters.forEach(({ id, value }) => {
            if (value !== undefined && value !== null) {
                params.append(id, String(value)); // Append each filter to the query
            }
        });
    }

    // Handle sorting
    if (sortBy) {
        sortBy.forEach(({ id, desc }) => {
            if (id) {
                params.append('sortBy', `${id}:${desc ? 'desc' : 'asc'}`);
            }
        });
    }

    // Handle additional query parameters
    if (query) {
        query.forEach(({ key, value }) => {
            if (value) {
                params.append(key, value);
            }
        });
    }

    // Return the stringified query parameters
    return params.toString();
};
