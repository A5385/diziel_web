import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otp!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    oldPassword!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    address?: string;
}
