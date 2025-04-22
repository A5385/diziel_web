import { Global, Module } from '@nestjs/common';
import { MailService } from 'src/microservices/shared/mail/mail.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Global()
@Module({
    controllers: [UserController],
    providers: [UserService, MailService],
    exports: [UserService],
})
export class UserModule {}
