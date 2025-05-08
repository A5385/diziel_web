import { Module } from '@nestjs/common';
import { AgencyAgentController } from './agency-agent.controller';
import { AgencyAgentService } from './agency-agent.service';

@Module({
    controllers: [AgencyAgentController],
    providers: [AgencyAgentService],
})
export class AgencyAgentModule {}
