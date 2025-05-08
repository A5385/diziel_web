import { Global, Module } from '@nestjs/common';
import { TranslateService } from 'src/app/shared/services/locale.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Global()
@Module({
    controllers: [UserController],
    providers: [UserService, TranslateService],
    exports: [UserService],
})
export class UserModule {}
