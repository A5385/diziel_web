import { Cairo, Geist, Geist_Mono } from 'next/font/google';

export const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const cairo = Cairo({
    subsets: ['arabic', 'latin', 'latin-ext'],
    variable: '--font-cairo',
    display: 'swap',
    adjustFontFallback: false,
});
