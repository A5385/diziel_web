'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { AKLabel } from './AKLabel';

type ComboboxItem = {
    value: string;
    label: string;
};

export type AKComboboxProps<T extends FieldValues> = {
    items: ComboboxItem[];
    label?: string;
    errors?: FieldErrors<T>;
};

export const AKCombobox = <T extends FieldValues>({ items, label }: AKComboboxProps<T>) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    {...{
                        variant: 'outline',
                        role: 'combobox',
                        className: 'w-[200px] justify-between',
                    }}
                    aria-expanded={open}
                >
                    {value ? items?.find((item) => item.value === value)?.label : label}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <AKLabel />
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput placeholder='Search ...' />
                    <CommandEmpty>No result found.</CommandEmpty>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue: React.SetStateAction<string>) => {
                                    setValue(currentValue === value ? '' : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === item.value ? 'opacity-100' : 'opacity-0',
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
