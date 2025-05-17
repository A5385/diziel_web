import { UserRole } from '@/types/prisma';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useZod = () => {
    const t = useTranslations();

    const fileValidator = z.custom<File>((v) => v instanceof File).optional();

    const mandatoryString = (min = 3, field = 'field') => {
        return z
            .string()
            .trim()
            .min(min, { message: t('field-required', { field }) });
    };
    const phone = z.string().min(3);
    // .regex(/^(?:\+20|0)?(10|11|12|15)\d{8}$/, t('phone-validation'));
    const role = z.nativeEnum(UserRole);
    const password = z.string().min(8, { message: 'Password must be at least 8 characters long' });
    const newPassword = z
        .string()
        .min(8, t('number'))
        .regex(/[A-Z]/, t('uppercase'))
        .regex(/[a-z]/, t('lowercase'))
        .regex(/[0-9]/, t('number'))
        .regex(/[\W_]/, t('special'));
    const email = z.string().email();
    const fullName = mandatoryString(3, t('full-name'));
    const nickname = mandatoryString(3, t('nickname'));
    const address = z.object({
        line1: mandatoryString(3, t('address')),
        line2: z.string().optional(),
        city: mandatoryString(3, t('city')),
        country: mandatoryString(3, t('country')),
        state: mandatoryString(3, t('state')),
    });

    const nationalIdNumber = mandatoryString(14, t('national-number-id'));

    const national = z.object({
        face: fileValidator,
        back: fileValidator,
    });
    const image = fileValidator;

    return {
        fields: {
            phone,
            role,
            password,
            newPassword,
            email,
            fullName,
            nickname,
            address,
            national,
            fileValidator,
        },
        schemas: {
            loginSchema: z.object({ phone, password }),
            profileSchema: z.object({
                email,
                fullName,
                nickname,
                image,
            }),
            userSchema: z.object({
                phone,
                role,
                nationalIdNumber,
            }),
        },
    };
};

export default useZod;
