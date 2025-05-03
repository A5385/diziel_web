import { PickType } from '@nestjs/swagger';
import { CommonInputDto } from 'src/common/common.dto';

export class UpdateProfileDto extends PickType(CommonInputDto, [
    'fullName',
    'email',
    'nickname',
    'address',
    'nationalIdNumber',
]) {}
