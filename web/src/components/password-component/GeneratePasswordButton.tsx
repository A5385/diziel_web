'use client';
import { generateStrongPassword } from '@/helpers/generateStrongPassword';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { BiCopy } from 'react-icons/bi';

export const GeneratePasswordButton = ({
    reset,
    password,
}: {
    reset: UseFormReset<any>;
    password: string;
}) => {
    const t = useTranslations();
    const [generated, setGenerated] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyRole = useCallback(async (password: string) => {
        await navigator.clipboard.writeText(password);
        setIsCopied(true);
        setGenerated(false);
        setTimeout(() => setIsCopied(false), 2000);
    }, []);

    const GeneratePassword = useCallback(() => {
        const { password } = generateStrongPassword();
        setGenerated(true);
        reset({
            password,
            confirmPassword: password,
        });
    }, [reset]);
    return (
        <div className='mt-5 flex items-center justify-between'>
            <button
                type='button'
                className='rounded-lg border px-3 py-1.5 text-end text-sm italic'
                onClick={GeneratePassword}
            >
                {t('generate-pass')}
            </button>
            {generated && (
                <button type='button' onClick={() => handleCopyRole(password)}>
                    <BiCopy className='dark:text-gary-200 text-slate-600' />
                </button>
            )}
            {isCopied && <span className='text-xs text-green-500'>{t('copied')}</span>}
        </div>
    );
};
