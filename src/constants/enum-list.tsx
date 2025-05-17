import {
    DriverGrade,
    DriverLicenseType,
    DriverType,
    DrugTestResult,
    UserRole,
} from '@/types/prisma';

import { extractValueFromEnum } from '../helpers/ExtractValueFromEnum';

export const UserRoleList: UserRole[] = extractValueFromEnum(UserRole);

export const DriverTypeList: DriverType[] = extractValueFromEnum(DriverType);

export const DriverGradeList: DriverGrade[] = extractValueFromEnum(DriverGrade);

export const DrugTestResultList: DrugTestResult[] = extractValueFromEnum(DrugTestResult);

export const DriverLicenseTypeList: DriverLicenseType[] = extractValueFromEnum(DriverLicenseType);
