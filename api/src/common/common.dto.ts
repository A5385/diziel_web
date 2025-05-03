import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    MinLength,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

function getPasswordErrorMessage(options: ValidationArguments): string {
    const { minLength, minLowercase, minUppercase, minNumbers, minSymbols } =
        options.constraints[0];
    const messages: string[] = [];

    if (minLength) messages.push(`at least ${minLength} characters`);
    if (minLowercase) messages.push(`at least ${minLowercase} lowercase letter(s)`);
    if (minUppercase) messages.push(`at least ${minUppercase} uppercase letter(s)`);
    if (minNumbers) messages.push(`at least ${minNumbers} number(s)`);
    if (minSymbols) messages.push(`at least ${minSymbols} symbol(s)`);

    return `Password must contain: ${messages.join(', ')}`;
}

export function Match(property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must match ${args.constraints[0]}`;
                },
            },
        });
    };
}

export class AddressInputDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    line1?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    line2?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    city?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    state?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    country?: string;
}
export class CommonInputDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }) => (value as string)?.toLowerCase())
    email!: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty()
    phone!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nationalIdNumber!: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    @ApiProperty()
    role!: UserRole;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty({
        example: 'NewP@ssw0rd',
        description: 'Must meet complexity requirements',
    })
    @IsString()
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message: (args) => getPasswordErrorMessage(args),
        },
    )
    newPassword!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    oldPassword!: string;

    @Match('newPassword', { message: 'Confirm password must match new password' })
    confirmPassword: string;

    @ApiProperty()
    @IsString()
    @MinLength(6, { message: 'OTP must be at least 6 characters long' })
    @IsNotEmpty()
    otp!: User['otp'];

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'name must be at least 6 characters long' })
    @IsNotEmpty()
    name!: string;

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Nickname must be at least 6 characters long' })
    @IsNotEmpty()
    nickname!: string;

    @IsString()
    @ApiProperty()
    @MinLength(3, { message: 'Full Name must be at least 6 characters long' })
    @IsNotEmpty()
    fullName!: string;

    @ApiProperty()
    @IsOptional()
    address?: AddressInputDto;
}
