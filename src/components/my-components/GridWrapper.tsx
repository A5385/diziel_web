import constants from '@/constants/AppSettings';
import { ColsType } from '@/constants/types';
import { cn } from '@/lib/utils';
import { ChildrenType } from '@/types/general';

const GridWrapper = ({
    children,
    cols = 1,
    className,
}: ChildrenType & { cols?: ColsType; className?: string }) => {
    return <div className={cn(className, 'grid gap-4', constants.grid[cols])}>{children}</div>;
};

export default GridWrapper;
