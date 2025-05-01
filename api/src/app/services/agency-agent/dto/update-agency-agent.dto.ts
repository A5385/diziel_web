import { PartialType } from '@nestjs/swagger';
import { CreateAgencyAgentDto } from './create-agency-agent.dto';

export class UpdateAgencyAgentDto extends PartialType(CreateAgencyAgentDto) {}
