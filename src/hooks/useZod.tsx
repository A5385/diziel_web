import {
    DriverGrade,
    DriverLicenseType,
    DriverType,
    DrugTestResult,
    UserRole,
} from '@/types/prisma';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const useZod = () => {
    const t = useTranslations();

    const fileValidator = z.custom<File>((v) => v instanceof File).optional();
    const dateValidator = z.date().optional();

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

    const driverType = z.nativeEnum(DriverType).optional();
    const grade = z.nativeEnum(DriverGrade).optional();

    const drugTest = z
        .object({
            testDate: dateValidator,
            result: z.nativeEnum(DrugTestResult),
            testImage: fileValidator,
        })
        .optional();

    const license = z
        .object({
            number: z.string().optional(),
            type: z.nativeEnum(DriverLicenseType).optional(),
            traffic_unit: z.string().optional(),
            face: fileValidator,
            back: fileValidator,
            startDate: dateValidator,
            endDate: dateValidator,
        })
        .optional();

    const visa = z
        .object({
            id: z.string().optional(),
            image: fileValidator,
            startDate: dateValidator,
            endDate: dateValidator,
            country: z.string().optional(),
            comments: z.string().optional(),
        })
        .optional();

    const passport = z
        .object({
            number: z.string().optional(),
            face: fileValidator,
            back: fileValidator,
            visas: z.array(visa).optional(),
        })
        .optional();

    const documents = z.object({
        criminalRecord: fileValidator,
        drugTest,
        license,
        passport,
    });

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
        },
        validations: {
            fileValidator,
            dateValidator,
        },
        schemas: {
            loginSchema: z.object({ phone, password }),
            profileSchema: z.object({
                email,
                fullName,
                nickname,
                image: fileValidator,
            }),
            userSchema: z.object({
                phone,
                role,
                nationalIdNumber,
            }),
            driverSchema: z.object({
                driverType,
                grade,
                documents,
            }),
        },
    };
};

export default useZod;
