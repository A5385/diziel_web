import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { useLocale } from 'next-intl';
import { ReactNode } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { cn } from '../../lib/utils';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { AKInputContainer, ContainerProps } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

type RadioFieldProps = {
    id: string;
    name: string;
    value: string;
};
export type AKRadioGroupProps<T extends FieldValues> = RadioGroupProps & {
    cb?: ReactNode;
    direction?: 'horizontal' | 'vertical';
    radioFields?: RadioFieldProps[];
    label?: string;
    labelProps?: Omit<LabelProps, 'label'>;
    containerProps?: ContainerProps;
    fieldStyle?: string;
    customField?: ReactNode;
    errors?: FieldErrors<T>;
};
export const AKRadioGroup = <T extends FieldValues>({
    cb,
    direction,
    className,
    radioFields,
    label,
    labelProps,
    containerProps,
    fieldStyle,
    customField,
    ...props
}: AKRadioGroupProps<T>) => {
    const l = useLocale();
    const customProps = {
        className: cn(
            className,
            'flex max-h-[300px] gap-5 ',
            direction === 'vertical' ? 'flex-col ' : 'flex-row ',
        ),
        ...props,
    };

    const defaultLabelProps: LabelProps = {
        htmlFor: props.id,
        required: props?.required,
        ...labelProps,
    };
    return (
        <AKInputContainer {...containerProps}>
            {label && <AKLabel {...defaultLabelProps} label={label} />}
            <RadioGroup {...customProps}>
                {customField ? (
                    customField
                ) : (
                    <>
                        {radioFields && radioFields.length > 0
                            ? radioFields.map((field) => (
                                  <div
                                      key={field?.id}
                                      className={cn(
                                          fieldStyle,
                                          l === 'ar' ? 'flex-row-reverse' : 'flex-row',
                                          'flex items-center gap-2 px-2',
                                      )}
                                  >
                                      <RadioGroupItem value={field?.value} id={field?.id} />
                                      <Label htmlFor={field?.id}>{field?.name}</Label>
                                  </div>
                              ))
                            : cb}
                    </>
                )}
            </RadioGroup>
        </AKInputContainer>
    );
};
