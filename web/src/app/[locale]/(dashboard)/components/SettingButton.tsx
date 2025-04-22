'use client';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/route';
import { UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SettingButton = () => {
    const { push } = useRouter();
    return (
        <Button variant={'outline'} size={'icon'} onClick={() => push(Routes.profile.url)}>
            <UserIcon />
        </Button>
    );
};

export default SettingButton;
