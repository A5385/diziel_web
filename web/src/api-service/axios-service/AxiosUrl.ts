export const buildUrl = (endpoint: string, id?: string | null, queryString?: string) => {
    const idPart = id ? `/${id}` : '';
    const queryPart = queryString ? `?${queryString}` : '';
    return `${endpoint}${idPart}${queryPart}`;
};
