import { PartialType, PickType } from '@nestjs/swagger';
import { CommonInputDto } from 'src/common/common.dto';

export class RegisterUserDto extends PickType(CommonInputDto, ['phone', 'role']) {}

export class VerifyPhoneDto extends PickType(CommonInputDto, ['phone']) {}

export class SetPasswordDto extends PickType(CommonInputDto, [
    'phone',
    'newPassword',
    'confirmPassword',
]) {}

export class VerifyOtpDto extends PickType(CommonInputDto, ['phone', 'otp']) {}

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
