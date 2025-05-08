import { ApiProperty, PickType } from '@nestjs/swagger';
import { DriverGrade, DriverLicenseType, DriverType } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommonInputDto } from 'src/common/common.dto';

export class DriverDrugTest {
    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    testDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    result: string;
}
export class DriverVisa extends PickType(CommonInputDto, ['startDate', 'endDate', 'passportId']) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    comments?: string;
}

export class DriverPassport {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    number: string;
}

export class DriverLicense extends PickType(CommonInputDto, ['startDate', 'endDate']) {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    number: string;

    @ApiProperty()
    @IsEnum(DriverLicenseType)
    @IsNotEmpty()
    type: DriverLicenseType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    traffic_unit: string;
}

export class DriverDocumentDto {
    @ApiProperty()
    @IsNotEmpty()
    drugTest: DriverDrugTest;

    @ApiProperty()
    @IsNotEmpty()
    license: DriverLicense;

    @ApiProperty()
    @IsOptional()
    passport?: DriverPassport;
}

export class CreateDriverDto extends PickType(CommonInputDto, ['profileId']) {
    @ApiProperty()
    @IsEnum(DriverType)
    @IsNotEmpty()
    driverType: DriverType;

    @ApiProperty()
    @IsEnum(DriverGrade)
    @IsNotEmpty()
    grade: DriverGrade;

    @ApiProperty()
    @IsNotEmpty()
    documents: DriverDocumentDto;
}
