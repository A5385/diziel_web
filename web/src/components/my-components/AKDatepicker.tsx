import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { AKInputContainer, ContainerProps } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

export type AKDatePickerProps = React.ComponentProps<typeof DayPicker> & {
    label?: string;
    value?: string;
    name: string;
    required?: boolean;
    labelProps?: Omit<LabelProps, 'label'>;
    containerProps?: ContainerProps;
    placeHolder?: string;
};

export const AKDatePicker: React.FC<AKDatePickerProps> = ({
    label,
    value,
    name,
    required,
    labelProps,
    containerProps,
    className,
    placeHolder,
    ...props
}) => {
    return (
        <AKInputContainer {...containerProps}>
            {label && (
                <AKLabel
                    {...{
                        htmlFor: name,
                        required: required,
                        ...labelProps,
                    }}
                    label={label}
                />
            )}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                            className,
                            'flex w-full justify-between gap-4 text-left font-normal',
                            !value && 'text-muted-foreground',
                        )}
                    >
                        {value && !isNaN(new Date(value).getTime()) ? (
                            format(new Date(value), 'PPP')
                        ) : (
                            <span>{placeHolder}</span>
                        )}
                        <CalendarIcon className='h-4 w-4 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                        {...{
                            initialFocus: true,

                            disabled: (date) => date > new Date() || date < new Date('1900-01-01'),
                            captionLayout: 'dropdown-buttons',
                            ...props,
                        }}
                    />
                </PopoverContent>
            </Popover>
        </AKInputContainer>
    );
};
