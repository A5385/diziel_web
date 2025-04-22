import { ColorType } from '@/types/ui';
import Link, { LinkProps } from 'next/link';
import React, { ReactNode } from 'react';
import { TbMinusVertical } from 'react-icons/tb';
import { useColor } from '../../hooks/useColor';
import { cn } from '../../lib/utils';

export type LinkIconPropsType = LinkProps & {
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
    icon?: ReactNode;
    title?: string;
    color?: ColorType;
    bordered?: boolean;
    filled?: boolean;
    className?: string;
    titleStyle?: string;
    separator?: boolean;
    variant?: 'link' | 'button-link' | 'normal';
    children?: ReactNode;
    target?: React.HTMLAttributeAnchorTarget;
    size?: 'icon' | 'normal';
};

export const AKLink: React.FC<LinkIconPropsType> = ({
    iconBefore,
    iconAfter,
    title,
    bordered = false,
    filled = false,
    color,
    icon,
    separator = false,
    className,
    variant = 'button-link',
    children,
    titleStyle,
    size = 'normal',
    ...props
}) => {
    const getBorderClass = useColor(color ?? 'default');

    const getFillClass = (color: string | undefined) => {
        switch (color) {
            case 'red':
                return 'bg-red-500 text-white hover:bg-red-700 hover:text-white';
            case 'green':
                return 'bg-sec text-white hover:bg-sec/80 hover:text-white';
            default:
                return 'bg-gray2 text-white hover:bg-gray2 hover:text-white';
        }
    };

    const initialStyle =
        'min-w-min min-h-[40px] rounded-lg py-1.5 px-3 flex items-center gap-1.5 duration-300';

    const variantClass =
        variant === 'link'
            ? 'w-fit text-red-500 hover:text-blue-500 underline duration-300'
            : variant === 'button-link'
              ? `${initialStyle} ${bordered ? getBorderClass : ''} ${
                    filled ? getFillClass(color) : ''
                }`
              : '';

    return (
        <Link
            {...{
                ...props,
                className: cn(
                    className ? className : variantClass,
                    size === 'icon' ? 'w-[40px] h-[40px] aspect-square' : '',
                ),
            }}
        >
            {variant === 'button-link' ? (
                <>
                    {iconBefore && (
                        <>
                            {iconBefore}
                            {separator && <TbMinusVertical size={20} />}
                        </>
                    )}
                    {icon && <span className='flex items-center gap-2'>{icon}</span>}
                    {title && <span className={titleStyle}>{title}</span>}
                    {iconAfter && <span className='flex items-center gap-2'>{iconAfter}</span>}
                </>
            ) : (
                <>
                    {title && <span className={titleStyle}>{title}</span>}
                    {children}
                </>
            )}
        </Link>
    );
};
