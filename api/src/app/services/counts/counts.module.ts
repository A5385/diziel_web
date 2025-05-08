import { Module } from '@nestjs/common';
import { CountsService } from './counts.service';
import { CountsController } from './counts.controller';

@Module({
  controllers: [CountsController],
  providers: [CountsService],
})
export class CountsModule {}
