import { Module } from '@nestjs/common';
import { TranslateService } from 'src/app/shared/services/locale.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    controllers: [ProfileController],
    providers: [ProfileService, TranslateService],
})
export class ProfileModule {}
