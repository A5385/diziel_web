import { PickType } from '@nestjs/swagger';
import { AddressInputDto, CommonInputDto } from 'src/common/common.dto';

export class UpdateProfileDto extends PickType(CommonInputDto, ['fullName', 'email', 'nickname']) {}

export class UpdateProfileAddressDto extends AddressInputDto {}
