'use client';
import { Button } from '@/components/ui/button';
import { SettingIcon } from '@/styles/icons';
import { useRouter } from 'next/navigation';

const SettingButton = () => {
    const { push } = useRouter();
    return (
        <Button variant={'outline'} size={'icon'} onClick={() => push('/')}>
            <SettingIcon />
        </Button>
    );
};

export default SettingButton;
