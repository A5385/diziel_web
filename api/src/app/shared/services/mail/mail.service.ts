import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(email: string, otp: string) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Welcome to FinPilot',
                text: 'Hello',
                template: 'confirmation',
                context: {
                    otp,
                },
            });
            return 'OTP Sent to your email. Check you email';
        } catch (error) {
            console.error('Error sending email:', (error as Error).message);
            throw new InternalServerErrorException('Failed send email.');
        }
    }
}
