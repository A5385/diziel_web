import { Injectable } from '@nestjs/common';
import { CreateAgencyAgentDto } from './dto/create-agency-agent.dto';
import { UpdateAgencyAgentDto } from './dto/update-agency-agent.dto';

@Injectable()
export class AgencyAgentService {
    create(createAgencyAgentDto: CreateAgencyAgentDto) {
        return 'This action adds a new agencyAgent';
    }

    findAll() {
        return `This action returns all agencyAgent`;
    }

    findOne(id: number) {
        return `This action returns a #${id} agencyAgent`;
    }

    update(id: number, updateAgencyAgentDto: UpdateAgencyAgentDto) {
        return `This action updates a #${id} agencyAgent`;
    }

    remove(id: number) {
        return `This action removes a #${id} agencyAgent`;
    }
}
