import { IconType, VariantType } from '@/types/ui';
import { FC, ReactNode } from 'react';
import { Button } from '../ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

type AKHoverCardPropsType = {
    title?: string;
    variant?: VariantType;
    content: ReactNode;
    icon?: IconType;
    contentStyle?: string;
    buttonStyle?: string;
};

const AKHoverCard: FC<AKHoverCardPropsType> = (props) => {
    const { icon, title, variant, content, contentStyle, buttonStyle } = props;
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    variant={variant}
                    className={`self-start ${
                        icon && title && 'flex items-center gap-3'
                    } ${buttonStyle}`}
                >
                    {icon && icon}
                    {title && title}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent
                className={contentStyle ? contentStyle : 'z-50 max-h-52 min-w-min bg-white px-5'}
            >
                {content}
            </HoverCardContent>
        </HoverCard>
    );
};

export default AKHoverCard;
