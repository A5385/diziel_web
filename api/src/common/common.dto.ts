import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommonInputDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }) => (value as string)?.toLowerCase())
    email!: string;

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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone!: string;

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
