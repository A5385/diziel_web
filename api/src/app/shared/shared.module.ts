import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailConfig } from 'src/config';
import * as Services from './services';

@Global()
@Module({
    imports: [MailerModule.forRootAsync(MailConfig)],
    providers: Object.values(Services),
    exports: Object.values(Services),
})
export class SharedModule {}
