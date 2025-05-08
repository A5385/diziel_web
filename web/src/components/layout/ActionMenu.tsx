import { DialogSizeType, DialogType } from '@/types/dialog';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import CommonDropdown from './CommonDropdown';

export interface CommonDropdownProps {
    noEdit?: boolean;
    noDelete?: boolean;
    itemId?: string;
    editType?: DialogType;
    dialogSize?: DialogSizeType;
    editFn?: () => void;
}

const ActionMenu = ({
    commonMenuProps,
    componentAfter,
    componentBefore,
}: {
    commonMenuProps: CommonDropdownProps;
    componentAfter?: React.ReactNode;
    componentBefore?: React.ReactNode;
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {componentBefore}
                <CommonDropdown {...commonMenuProps} />
                {componentAfter}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
