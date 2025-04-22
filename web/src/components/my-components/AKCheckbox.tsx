import { CheckboxProps } from '@radix-ui/react-checkbox';
import React from 'react';
import { Checkbox } from '../ui/checkbox';

export type AKCheckBoxProps = CheckboxProps;

export const AKCheckBox: React.FC<AKCheckBoxProps> = ({ ...props }) => {
    return <Checkbox {...props} />;
};
