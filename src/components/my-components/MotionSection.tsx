'use client';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

// Define a new interface that extends MotionProps
interface CustomMotionProps extends MotionProps {
    className?: string;
}

// Create a new component that uses the custom props
export const MotionDiv = motion.create<CustomMotionProps>('div');

export type MotionSectionProps = CustomMotionProps & {
    show: boolean;
    children: ReactNode;
    // className?: string;
    // Remove key from props
};

export const MotionSection = ({ show, children, ...props }: MotionSectionProps) => {
    const {
        initial = { height: 0, opacity: 0 },
        animate = { height: 'auto', opacity: 1 },
        transition = { duration: 0.2, ease: 'easeOut' },
        exit = { height: 0, opacity: 0 },
        ...rest
    } = props;

    return (
        <AnimatePresence>
            {show && (
                <MotionDiv
                    initial={initial}
                    animate={animate}
                    transition={transition}
                    exit={exit}
                    {...rest} // Apply other props
                >
                    {children}
                </MotionDiv>
            )}
        </AnimatePresence>
    );
};
