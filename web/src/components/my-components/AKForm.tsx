'use client';

import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import { FormEventHandler, ReactNode, useMemo } from 'react';
import { ArrayPath, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { cn } from '../../lib/utils';

import { CancelIcon } from '@/styles/icons';
import { useTranslations } from 'next-intl';
import { ResetButton } from '../layout/ResetButton';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '../ui/card';
import { Form } from '../ui/form';
import { AKButton } from './AKButton';

export type AKFormPropsType<T extends FieldValues> = {
    title?: string;
    titleClassName?: string;
    descClassName?: string;
    desc?: string;
    submit: SubmitHandler<T> | FormEventHandler<HTMLFormElement> | undefined;
    formActions?: ReactNode;
    submitButtonTitle?: string;
    form: UseFormReturn<T>;
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    actionItemPosition?: 'start' | 'center' | 'end' | 'evenly';
    cancelButtonTitle?: string;
    showCancelButton?: boolean;
    showResetButton?: boolean;
    hideResetIcon?: boolean;
    showActionIcon?: boolean;
    hideLeftActionSection?: boolean;
    cancelAction?: () => void;
    customActionSection?: ReactNode;
    submitButtonFullWidth?: boolean;
    extraReset?: () => void;
    inline?: boolean;
    children?: ReactNode;
    addMoreAction?: ReactNode;
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
    formActions,
    submitButtonTitle = 'submit',
    form,
    columns = 1,
    actionItemPosition = 'center',
    cancelButtonTitle = 'Cancel',
    cancelAction,
    customActionSection,
    showCancelButton,
    showResetButton,
    hideResetIcon,
    showActionIcon,
    hideLeftActionSection,
    submitButtonFullWidth,
    extraReset = () => {},
    inline,
    titlePosition = 'start',
    children,
    addMoreAction,
    image,
    imageWidth = 50,
    imageHeight = 50,
    imageClassName,
    imageAlt = '3asare3',
    width = 'full',
    className,
}: AKFormPropsType<T>) => {
    const t = useTranslations();
    const itemPosition = useMemo(
        () => ({
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            evenly: 'justify-evenly',
        }),
        [],
    );

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

    const gridList = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6',
        7: 'md:grid-cols-7',
        8: 'md:grid-cols-8',
        9: 'md:grid-cols-9',
        10: 'md:grid-cols-10',
        11: 'md:grid-cols-11',
        12: 'md:grid-cols-12',
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
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submit as SubmitHandler<FieldValues>)}
                        className={cn(
                            inline ? 'flex flex-col items-end md:flex-row' : 'flex flex-col',
                            'mx-auto w-full gap-5',
                        )}
                    >
                        <div
                            className={cn(
                                gridList[columns],
                                'grid w-full grid-cols-1 items-start gap-3',
                            )}
                        >
                            {children}
                        </div>

                        <div
                            className={cn(
                                !inline && 'w-full',
                                !submitButtonFullWidth && 'items-center',
                                'flex justify-between',
                            )}
                        >
                            {/* Custom action section or default form action buttons */}
                            {customActionSection || (
                                <>
                                    {!hideLeftActionSection && (
                                        <div className='flex items-center gap-5'>
                                            {/* Cancel Button */}
                                            {showCancelButton && !inline && (
                                                <AKButton
                                                    type='button'
                                                    title={cancelButtonTitle}
                                                    variant='outline'
                                                    // color='red'
                                                    onClick={cancelAction}
                                                    icon={<CancelIcon size={20} />}
                                                />
                                            )}
                                            {/* Additional form actions */}
                                            {formActions}
                                        </div>
                                    )}

                                    {/* Submit and Reset Button Section */}
                                    <CardFooter
                                        className={cn(
                                            'mt-4 flex w-full items-center gap-5',
                                            itemPosition[actionItemPosition],
                                            !submitButtonFullWidth && 'flex-1',
                                            inline && 'w-fit',
                                        )}
                                    >
                                        {/* Optional Add More Action */}
                                        {addMoreAction}

                                        {/* Submit Button */}
                                        <AKButton
                                            type='submit'
                                            title={t(submitButtonTitle)}
                                            variant='outline'
                                            color='main'
                                            disabled={form.formState.isSubmitting}
                                            icon={showActionIcon ? <CheckIcon /> : null}
                                            className={cn(
                                                submitButtonFullWidth ? 'flex-1' : '',
                                                'mt-4',
                                            )}
                                            loading={form.formState.isSubmitting}
                                        />

                                        {/* Reset Button */}
                                        {showResetButton && (
                                            <ResetButton
                                                hideResetIcon={hideResetIcon}
                                                reset={() => {
                                                    form.reset();
                                                    extraReset(); // Optional extra reset function
                                                }}
                                            />
                                        )}
                                    </CardFooter>
                                </>
                            )}
                        </div>
                        {formActions && <div className='form-actions'>{formActions}</div>}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
