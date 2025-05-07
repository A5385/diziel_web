import { CheckboxProps } from '@radix-ui/react-checkbox';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';

export type AKCheckBoxProps<T extends FieldValues> = CheckboxProps & { errors?: FieldErrors<T> };

export const AKCheckBox = <T extends FieldValues>({ ...props }: AKCheckBoxProps<T>) => {
    return <Checkbox {...props} />;
};
