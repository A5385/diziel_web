import constants from '@/constants/AppSettings';
import { ChildrenType } from '@/types/general';
import { NextIntlClientProvider } from 'next-intl';
import { DialogProvider } from './DialogProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ThemeProvider } from './theme-provider';
import { ToasterProvider } from './ToasterProvider';

const GlobalProviders = ({ children }: ChildrenType) => {
    return (
        <NextIntlClientProvider>
            <ThemeProvider {...constants.theme}>
                <ReactQueryProvider>
                    <ToasterProvider />
                    <DialogProvider>{children}</DialogProvider>
                </ReactQueryProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    );
};

export default GlobalProviders;
