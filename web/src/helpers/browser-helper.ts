export const isBrowser = typeof window !== 'undefined';
export const getWebHostname = (): string | null => {
    if (isBrowser) {
        return window.location.hostname;
    }

    return null;
};
