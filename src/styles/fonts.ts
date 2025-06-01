import localFont from 'next/font/local';

export const geistSans = localFont({
    src: [
        { path: '../../public/fonts/geist/Geist-Thin.ttf', weight: '100', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-ExtraLight.ttf', weight: '200', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-Light.ttf', weight: '300', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-Medium.ttf', weight: '500', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-Bold.ttf', weight: '700', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-ExtraBold.ttf', weight: '800', style: 'normal' },
        { path: '../../public/fonts/geist/Geist-Black.ttf', weight: '900', style: 'normal' },
    ],
    variable: '--font-geist-sans',
    display: 'swap',
});

export const cairo = localFont({
    src: [
        { path: '../../public/fonts/cairo/Cairo-ExtraLight.ttf', weight: '200', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-Light.ttf', weight: '300', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-Regular.ttf', weight: '400', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-Medium.ttf', weight: '500', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-Bold.ttf', weight: '700', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-ExtraBold.ttf', weight: '800', style: 'normal' },
        { path: '../../public/fonts/cairo/Cairo-Black.ttf', weight: '900', style: 'normal' },
    ],
    variable: '--font-cairo',
    display: 'swap',
});
