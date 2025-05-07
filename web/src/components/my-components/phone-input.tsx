import { cn } from '../../lib/utils';
import { PhoneInput, PhoneInputProps } from '../ui/phone-input';
import { AKInputContainer } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

export type AKPhoneInputProps = PhoneInputProps & { label?: string; labelProps?: LabelProps };
export const AKPhoneInput = ({ label, labelProps, className, ...props }: AKPhoneInputProps) => {
    return (
        <AKInputContainer>
            {label && (
                <AKLabel
                    htmlFor={props.id}
                    required={props.required}
                    {...labelProps}
                    label={label}
                />
            )}
            <PhoneInput {...props} className={cn(className)} />
        </AKInputContainer>
    );
};
