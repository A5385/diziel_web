import { Module } from '@nestjs/common';

import { TranslateService } from 'src/app/shared/services/locale.service';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
    controllers: [DriverController],
    providers: [DriverService, TranslateService],
})
export class DriverModule {}
