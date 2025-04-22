export const getHeaders = (headerType: 'file' | 'json' = 'json'): Record<string, string> => {
    const headers = {
        file: { 'Content-Type': 'multipart/form-data' },
        json: { 'Content-Type': 'application/json' },
    };
    return headers[headerType];
};
