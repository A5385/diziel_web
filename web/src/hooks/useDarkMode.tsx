'use client';
import { useTheme } from 'next-themes';

export const useDarkMode = () => {
    const { systemTheme } = useTheme();
    const isDark = Boolean(systemTheme === 'dark');

    return { isDark };
};
