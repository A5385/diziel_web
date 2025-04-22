import { SwitchProps } from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { Switch } from '../ui/switch';
import { DivProps } from './AKInputContainer';
import { AKLabel, LabelProps } from './AKLabel';

export type AKSwitchProps = SwitchProps & {
    label?: string;
    labelProps?: Omit<LabelProps, 'label'>;
    containerStyle?: string;
    divProps?: DivProps;
    switchStyle?: string;
};

export const AKSwitch = ({
    label,
    labelProps,
    divProps,
    containerStyle,
    switchStyle,
    ...props
}: AKSwitchProps) => {
    const defaultLabelProps: LabelProps = {
        htmlFor: props.id,
        required: props.required,
        ...labelProps,
    };

    const customDivProps = {
        className: cn(
            containerStyle,
            !label
                ? 'w-fit'
                : 'w-full flex  items-center justify-between rounded-lg border p-3 shadow-sm hover:bg-gray-50',
        ),
        ...divProps,
    };
    // console.log(label);
    return (
        <div {...customDivProps}>
            {label && <AKLabel {...defaultLabelProps} label={label} />}
            <Switch {...props} className={switchStyle} />
        </div>
    );
};
