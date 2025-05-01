import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AgencyAgentService } from './agency-agent.service';
import { CreateAgencyAgentDto } from './dto/create-agency-agent.dto';
import { UpdateAgencyAgentDto } from './dto/update-agency-agent.dto';

@Controller('agency-agent')
export class AgencyAgentController {
    constructor(private readonly agencyAgentService: AgencyAgentService) {}

    @Post()
    create(@Body() createAgencyAgentDto: CreateAgencyAgentDto) {
        return this.agencyAgentService.create(createAgencyAgentDto);
    }

    @Get()
    findAll() {
        return this.agencyAgentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.agencyAgentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAgencyAgentDto: UpdateAgencyAgentDto) {
        return this.agencyAgentService.update(+id, updateAgencyAgentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.agencyAgentService.remove(+id);
    }
}
