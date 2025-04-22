import { PickType } from '@nestjs/swagger';
import { CommonInputDto } from 'src/common/common.dto';

export class SetPasswordDto extends PickType(CommonInputDto, ['email', 'password']) {}
