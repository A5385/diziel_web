'use client';
import { useEffect, useState } from 'react';

export type PasswordStrengthType =
    | ''
    | 'Very Weak'
    | 'Weak'
    | 'Moderate'
    | 'Strong'
    | 'Very Strong';

export const useCheckCriteria = (
    password: string,
): {
    passwordStrength: PasswordStrengthType;
    missingCriteria: string[];
} => {
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthType>('');
    const [missingCriteria, setMissingCriteria] = useState<string[]>([]);

    useEffect(() => {
        const criteria = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[\W_]/.test(password),
        };

        const strength = Object.values(criteria).filter((c) => c).length;
        const newMissingCriteria = Object.keys(criteria).filter(
            (criterion) => !criteria[criterion as keyof typeof criteria],
        );

        if (strength === 0) setPasswordStrength('');
        else if (strength === 1) setPasswordStrength('Very Weak');
        else if (strength === 2) setPasswordStrength('Weak');
        else if (strength === 3) setPasswordStrength('Moderate');
        else if (strength === 4) setPasswordStrength('Strong');
        else if (strength === 5) setPasswordStrength('Very Strong');

        setMissingCriteria(newMissingCriteria);
    }, [password]);

    return { passwordStrength, missingCriteria };
};
