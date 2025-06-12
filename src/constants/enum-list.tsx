import {
    DriverGrade,
    DriverLicenseType,
    DriverType,
    DrugTestResult,
    PaymentOption,
    TransportType,
    UnitType,
    UserRole,
} from '@/types/prisma';

import { extractValueFromEnum } from '../helpers/ExtractValueFromEnum';

export const UserRoleList: UserRole[] = extractValueFromEnum(UserRole);

export const DriverTypeList: DriverType[] = extractValueFromEnum(DriverType);

export const DriverGradeList: DriverGrade[] = extractValueFromEnum(DriverGrade);

export const DrugTestResultList: DrugTestResult[] = extractValueFromEnum(DrugTestResult);

export const DriverLicenseTypeList: DriverLicenseType[] = extractValueFromEnum(DriverLicenseType);

export const UnitTypeList: UnitType[] = extractValueFromEnum(UnitType);

export const TransportTypeList: TransportType[] = extractValueFromEnum(TransportType);

export const PaymentOptionsList: PaymentOption[] = extractValueFromEnum(PaymentOption);
