'use client';

import Image from 'next/image';
import { FormEventHandler, ReactNode } from 'react';
import { ArrayPath, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { cn } from '../../../lib/utils';

import { ColsType } from '@/constants/types';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../../ui/card';
import { Form } from '../../ui/form';
import GridWrapper from '../GridWrapper';

export type AKFormPropsType<T extends FieldValues> = {
    title?: string;
    titleClassName?: string;
    descClassName?: string;
    desc?: string;
    submit: SubmitHandler<T> | FormEventHandler<HTMLFormElement> | undefined;
    // formActions?: ReactNode;
    // submitButtonTitle?: string;
    form: UseFormReturn<T>;
    columns?: ColsType;
    // actionItemPosition?: 'start' | 'center' | 'end' | 'evenly';
    // cancelButtonTitle?: string;
    // showCancelButton?: boolean;
    // showResetButton?: boolean;
    // hideResetIcon?: boolean;
    // showActionIcon?: boolean;
    // hideLeftActionSection?: boolean;
    // cancelAction?: () => void;
    // customActionSection?: ReactNode;
    // submitButtonFullWidth?: boolean;
    // extraReset?: () => void;
    inline?: boolean;
    children?: ReactNode;
    formButtons?: ReactNode;
    fieldName?: ArrayPath<T>;
    className?: string;
    width?: 'full' | 'lg' | 'md' | 'sm' | 'xs' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    titlePosition?: 'start' | 'center' | 'end';
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageClassName?: string;
    imageAlt?: string;
};

// AKFormWithField component definition
export const AKForm = <T extends FieldValues>({
    title,
    titleClassName,
    descClassName,
    desc,
    submit,
    form,
    columns = 1,
    inline,
    titlePosition = 'start',
    children,
    image,
    imageWidth = 50,
    imageHeight = 50,
    formButtons,
    imageClassName,
    imageAlt = '3asare3',
    width = 'full',
    className,
}: AKFormPropsType<T>) => {
    const t = useTranslations();

    const formWidth = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full',
    };

    const mapPosition = {
        start: 'text-start',
        center: 'text-center',
        end: 'text-end',
    };

    return (
        <Card className={cn(className, formWidth[width], 'flex flex-col gap-2 pt-2')}>
            {title && (
                <CardTitle
                    className={cn(
                        mapPosition[titlePosition],
                        titleClassName,
                        'my-4 px-8 text-center text-2xl font-bold',
                    )}
                >
                    {image && (
                        <Image
                            src={image}
                            alt={imageAlt}
                            width={imageWidth}
                            height={imageHeight}
                            className={imageClassName}
                        />
                    )}
                    {t(title)}
                </CardTitle>
            )}
            {desc && (
                <CardDescription className={cn(descClassName, 'mb-4 pb-4 text-center')}>
                    {t(desc)}
                </CardDescription>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submit as SubmitHandler<FieldValues>)}
                    className={cn(
                        inline ? 'flex flex-col items-end md:flex-row' : 'flex flex-col',
                        'mx-auto w-full gap-4',
                    )}
                >
                    <CardContent>
                        <GridWrapper cols={columns}>{children}</GridWrapper>

                        {/* {formActions && <div className='form-actions'>{formActions}</div>} */}
                    </CardContent>

                    <CardFooter className={cn('flex w-full items-center gap-5')}>
                        {formButtons}
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

{
    /* <div
    className={cn(
        !inline && 'w-full',
        !submitButtonFullWidth && 'items-center',
        'flex justify-between',
    )}
>
    {customActionSection || (
        <>
            {!hideLeftActionSection && (
                <div className='flex items-center gap-5'>
                    {/* Cancel Button */
}
//     {showCancelButton && !inline && (
//         <AKButton
//             type='button'
//             title={cancelButtonTitle}
//             variant='outline'
//             // color='red'
//             onClick={cancelAction}
//             icon={<CancelIcon size={20} />}
//         />
//     )}
//     {formActions}
// </div>
// )}

// <CardFooter
//     className={cn(
//         'flex w-full items-center gap-5',
//         itemPosition[actionItemPosition],
//         !submitButtonFullWidth && 'flex-1',
//         inline && 'w-fit',
//     )}
// >
//     {addMoreAction}

//     {showResetButton && (
//         <ResetButton
//             hideResetIcon={hideResetIcon}
//             reset={() => {
//                 form.reset();
//                 extraReset();
//             }}
//         />
//     )}
// </CardFooter>
// </>
// )}
// </div> */}
