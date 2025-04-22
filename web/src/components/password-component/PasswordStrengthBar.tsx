'use client';
import { Progress } from '../../components/ui/progress';

export const PasswordStrengthBar = ({ passwordStrength }: { passwordStrength: string }) => {
    return (
        <Progress
            value={
                passwordStrength === 'Very Weak'
                    ? 20
                    : passwordStrength === 'Weak'
                      ? 40
                      : passwordStrength === 'Moderate'
                        ? 60
                        : passwordStrength === 'Strong'
                          ? 80
                          : 100
            }
            className={`${
                passwordStrength === 'Very Weak'
                    ? 'bg-pink-500'
                    : passwordStrength === 'Weak'
                      ? 'bg-orange-500'
                      : passwordStrength === 'Moderate'
                        ? 'bg-blue-500'
                        : passwordStrength === 'Strong'
                          ? 'bg-purple-500'
                          : 'bg-green-500'
            } mx-auto mt-5 h-1 w-[95%]`}
        />
    );
};
