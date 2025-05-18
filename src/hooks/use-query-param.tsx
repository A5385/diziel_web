'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useQueryParams = () => {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();

    const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

    const updateSearch = useCallback(
        (cb: (p: URLSearchParams) => void) => {
            const p = new URLSearchParams(searchParams.toString()); // clone
            cb(p);
            router.replace(`?${p.toString()}`, { scroll: false });
        },
        [router, searchParams],
    );

    const delParam = useCallback(
        (key: string) => {
            updateSearch((p) => {
                p.delete(key);
            });
        },
        [updateSearch],
    );
    const resetUrl = useCallback(
        (scroll = false) => router.replace(pathname, { scroll }),
        [router, pathname],
    );

    return { getParam, updateSearch, delParam, resetUrl };
};

export default useQueryParams;
