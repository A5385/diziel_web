import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

type PropsType = DivProps & {
    children: ReactNode;
    containerStyle?: string;
    direction?: 'horizontal' | 'vertical';
};
export type ContainerProps = Omit<PropsType, 'children'>;
export const AKInputContainer = ({
    children,
    containerStyle,
    hidden,
    direction = 'vertical',
    ...divProps
}: PropsType) => {
    // console.log("hidden", hidden);
    return (
        <div
            hidden={hidden}
            {...divProps}
            className={cn(
                containerStyle,
                hidden && '!hidden',
                direction === 'horizontal' ? 'flex-row items-center' : 'flex-col',
                'flex w-full min-w-min gap-2',
            )}
        >
            {children}
        </div>
    );
};
