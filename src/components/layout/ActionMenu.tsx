import { cn } from '@/lib/utils';
import { useDialog } from '@/providers/DialogProvider';
import { DeleteIcon, EditIcon } from '@/styles/icons';
import { DialogSizeType, DialogType } from '@/types/dialog';
import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AKDropdownMenuItem } from '../my-components/AKDropdownMenuItem';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

export interface ActionMenuProps {
    noEdit?: boolean;
    noDelete?: boolean;
    itemId?: string;
    editType?: DialogType;
    dialogSize?: DialogSizeType;
    editFn?: () => void;
    componentAfter?: React.ReactNode;
    componentBefore?: React.ReactNode;
}

const ActionMenu = ({
    itemId,
    noEdit = false,
    noDelete = false,
    editType,
    dialogSize = 'md',
    editFn,
    componentAfter,
    componentBefore,
}: ActionMenuProps) => {
    const g = useTranslations();
    const { handleOpenDialog } = useDialog();

    const iconProps = {
        size: 12,
    };

    const handleEdit = () => {
        if (editFn) {
            editFn();
        } else {
            handleOpenDialog({ type: editType ?? '', itemId, dialogSize: dialogSize ?? 'xl' });
        }
    };

    const handleDelete = () => {
        handleOpenDialog({
            type: 'delete',
            itemId,
            dialogSize: 'sm',
        });
    };

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
                {!noEdit && (
                    <AKDropdownMenuItem
                        className={cn('text-green-500')}
                        onClick={handleEdit}
                        icon={<EditIcon {...iconProps} color='green' />}
                        title={g('edit')}
                    />
                )}
                {!noDelete && (
                    <AKDropdownMenuItem
                        className={cn('text-red-500 hover:bg-orange-200')}
                        onClick={handleDelete}
                        icon={<DeleteIcon {...iconProps} color='red' />}
                        title={g('delete')}
                    />
                )}
                {componentAfter}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
