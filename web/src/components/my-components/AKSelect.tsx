import { SelectContentProps, SelectProps, SelectTriggerProps } from '@radix-ui/react-select';
import * as React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { useDebounce } from '../../hooks/useDebounce';
import { cn } from '../../lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AKButton } from './AKButton';
import { AKInput } from './AKInput';
import { AKInputContainer, ContainerProps } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

export type ItemType = {
    id?: string;
    value: string; // Must not be empty
    label: string;
};

export type AKSelectProps<T extends FieldValues> = SelectProps & {
    selectItems: ItemType[];
    triggerProps?: SelectTriggerProps;
    selectContentProps?: SelectContentProps;
    selectStyle?: string;
    search?: string;
    setSearch?: React.Dispatch<React.SetStateAction<string>>;
    label?: string;
    noLabel?: boolean;
    placeholder?: string;
    labelProps?: Omit<LabelProps, 'label'>;
    containerProps?: ContainerProps;
    errors?: FieldErrors<T>;
    loadMore?: () => void;
    loadLess?: () => void;
    showSearchDataLimit?: number;
    noSearch?: boolean;
    debounceTime?: number; // Configurable debounce time
    renderItem?: (item: ItemType) => React.ReactNode; // Custom render prop for items
    loading?: boolean; // Loading state
};

export const AKSelect = <T extends FieldValues>({
    selectItems = [],
    triggerProps,
    selectContentProps,
    selectStyle,
    label,
    search,
    setSearch,
    labelProps,
    placeholder = 'Select an option...',
    containerProps,
    loadMore,
    loadLess,
    noLabel = false,
    noSearch = false,
    debounceTime = 1000,
    renderItem,
    loading = false,
    value, // Get value from props
    onValueChange, // Get onValueChange from props
    ...props
}: AKSelectProps<T>) => {
    const [localSearch, setLocalSearch] = React.useState(search || '');

    const debouncedSearch = useDebounce(localSearch, debounceTime);

    const customStyle = cn(selectStyle, 'w-full');

    const defaultLabelProps: LabelProps = {
        htmlFor: props.name,
        required: props.required,
        ...labelProps,
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearch(value);

        // Pass the search value to the parent component for remote search
        if (setSearch) {
            setSearch(value);
        }
    };

    const filteredItems = React.useMemo(() => {
        if (!debouncedSearch.trim()) return selectItems; // Return the full list if search is empty
        return selectItems.filter((item) =>
            item.label.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );
    }, [debouncedSearch, selectItems]);

    const renderSelectItem = (item: ItemType) => {
        if (renderItem) {
            return renderItem(item);
        }
        return (
            <SelectItem key={item.id ?? item.value} value={item.value}>
                {item.label}
            </SelectItem>
        );
    };

    return (
        <AKInputContainer {...containerProps}>
            {label && !noLabel && <AKLabel {...defaultLabelProps} label={label} />}
            <Select
                {...props}
                value={value} // Use the value from props
                onValueChange={onValueChange} // Pass through the onValueChange handler
            >
                <SelectTrigger className={customStyle} {...triggerProps} aria-label={placeholder}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent {...selectContentProps}>
                    {!noSearch && (
                        <div className='p-2'>
                            <AKInput
                                type='search'
                                value={localSearch}
                                onChange={handleSearch}
                                placeholder='Search...'
                                aria-label='Search options'
                            />
                        </div>
                    )}
                    {loading ? (
                        <div className='p-2 text-center text-gray-500'>Loading...</div>
                    ) : filteredItems.length > 0 ? (
                        filteredItems.map((item) => renderSelectItem(item))
                    ) : (
                        <div className='p-2 text-center text-gray-500'>No options available</div>
                    )}
                    {(loadMore || loadLess) && (
                        <div className='mt-4 flex justify-evenly gap-4'>
                            {loadMore && (
                                <AKButton
                                    type='button'
                                    title='More'
                                    variant='ghost'
                                    onClick={loadMore}
                                />
                            )}
                            {loadLess && (
                                <AKButton
                                    type='button'
                                    title='Less'
                                    variant='ghost'
                                    onClick={loadLess}
                                />
                            )}
                        </div>
                    )}
                </SelectContent>
            </Select>
        </AKInputContainer>
    );
};
