'use client';

import { BtnSize, btnType, ColorType, IconType, VariantType } from '@/types/ui';
import { FC, ReactNode, useState } from 'react';
import { cn } from '../../lib/utils';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet';
import { AKButton, BtnProps } from './AKButton';

export type AKSheetPropsType = {
    buttonTitle?: string;
    icon?: IconType;
    children: ReactNode;
    title?: string;
    color?: ColorType;
    variant?: VariantType;
    contentStyle?: string;
    hideFooter?: boolean;
};

const AKSheet: FC<AKSheetPropsType> = ({
    buttonTitle,
    title,
    children,
    contentStyle,
    hideFooter,
    ...restOfProps
}) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const toggleDrawer = (toggle: boolean) => {
        setOpenDrawer(toggle);
    };

    const size: BtnSize = buttonTitle ? 'default' : 'icon';
    const type: btnType = 'button';

    const btnProps: BtnProps = {
        type,
        size,
        title: buttonTitle,
        onClick: () => toggleDrawer(true),
        ...restOfProps,
    };

    const closeBtnProps: BtnProps = {
        title: 'Close',
        type,
        onClick: () => toggleDrawer(false),
    };

    return (
        <Sheet onOpenChange={setOpenDrawer} open={openDrawer}>
            <SheetTrigger asChild>
                <AKButton {...btnProps} />
            </SheetTrigger>
            <SheetContent className={cn(contentStyle, 'h-screen !min-w-min overflow-y-scroll')}>
                <SheetHeader className='flex flex-col items-center'>
                    {title && <SheetTitle> {title}</SheetTitle>}
                </SheetHeader>
                <div className='mt-8'>{children}</div>
                <SheetFooter>
                    {!hideFooter && (
                        <SheetClose asChild>
                            <AKButton {...closeBtnProps} />
                        </SheetClose>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default AKSheet;
