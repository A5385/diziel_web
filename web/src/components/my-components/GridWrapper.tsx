import constants from '@/constants/constants';
import { ColsType } from '@/constants/types';
import { cn } from '@/lib/utils';
import { ChildrenType } from '@/types/general';

const GridWrapper = ({
    children,
    cols = 1,
    className,
}: ChildrenType & { cols?: ColsType; className?: string }) => {
    return (
        <div className={cn(className, 'grid grid-cols-2 gap-4', constants.grid[cols])}>
            {children}
        </div>
    );
};

export default GridWrapper;
