'use client';
import constants from '@/constants/AppSettings';
import { Toaster, ToasterProps } from 'sonner';

export const ToasterProvider = ({ ...props }: ToasterProps) => {
    const { theme, richColors, position, duration, ...rest } = props;
    const defaultProps: ToasterProps = {
        theme: theme ?? constants.toaster.theme,
        richColors: richColors ?? constants.toaster.richColors,
        position: position ?? constants.toaster.position,
        duration: duration ?? constants.toaster.duration,
        ...rest,
    };
    return <Toaster {...defaultProps} />;
};
