import { PickType } from '@nestjs/swagger';
import { CommonInputDto } from 'src/common/common.dto';

export class VerifyOtpDto extends PickType(CommonInputDto, ['phone', 'otp']) {}
