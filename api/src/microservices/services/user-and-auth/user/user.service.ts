import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { GenerateOTP } from 'src/helper/GenerateOTP';
import { ContextType, handleRequest } from 'src/helper/handleRequest';
import { hashPassword } from 'src/helper/pwd-manager';
import { LoggerService } from 'src/microservices/shared/logger/logger.service';
import { MailService } from 'src/microservices/shared/mail/mail.service';
import { PrismaService } from 'src/microservices/shared/prisma/prisma.service';
import { LocaleType } from 'src/types/backend';
import { SetPasswordDto } from './dto/set-passowrd.dto copy';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly logger: LoggerService,
    ) {}
    private readonly context: ContextType = 'user';
    async create(email: string, role: UserRole = 'owner', locale?: LocaleType) {
        const user = await this.findUserByEmail(email, locale);
        if (user.data) throw new ConflictException('User already exists');

        return await handleRequest({
            context: this.context,
            logger: this.logger,
            method: 'create',
            locale,
            fn: async () => {
                const newUser = await this.prisma.user.create({
                    data: { email, role },
                });
                if (newUser) {
                    const tenterOtp = GenerateOTP(4);
                    const sendEmail = await this.mailService.sendUserConfirmation(
                        email,
                        String(tenterOtp),
                    );

                    if (sendEmail) {
                        this.logger.sendEmail({
                            type: 'Confirmation',
                            to: 'new user',
                            object: `with OTP: ${String(tenterOtp)}`,
                            context: this.context,
                        });

                        const updateUser = await this.prisma.user.update({
                            where: { id: newUser.id },
                            data: { otp: tenterOtp.toString() },
                        });
                        return updateUser;
                    }
                }
            },
        });
    }

    async verifyOtp({ email, otp }: VerifyOtpDto, locale?: LocaleType) {
        const { data: user } = await this.findUserByEmail(email, locale);

        if (!user) throw new NotFoundException('User no longer exist');

        const isValidOtp = user.otp === otp;

        if (!isValidOtp) throw new ConflictException('Invalid OTP');

        return await handleRequest({
            context: this.context,
            logger: this.logger,
            method: 'update',
            id: user?.id,
            locale,
            fn: async () => {
                const updatedUser = await this.prisma.user.update({
                    where: { id: user.id },
                    data: { otp: null, verified: new Date() },
                });
                return updatedUser;
            },
        });
    }

    async setPassword({ password, email }: SetPasswordDto, locale?: LocaleType) {
        const { data: user } = await this.findUserByEmail(email, locale);

        if (!user) throw new NotFoundException('User no longer exist');

        return await handleRequest({
            context: this.context,
            logger: this.logger,
            method: 'update',
            id: user?.id,
            locale,
            fn: async () => {
                const updatedUser = await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        hashedPassword: await hashPassword(password),
                        isPasswordSet: new Date(),
                    },
                });
                return updatedUser;
            },
        });
    }

    async findUserByEmail(email: string, locale?: LocaleType) {
        return await handleRequest({
            context: this.context,
            logger: this.logger,
            method: 'findBy',
            key: 'email',
            by: email,
            locale,
            fn: async () => {
                return await this.prisma.user.findUnique({
                    where: { email },
                });
            },
        });
    }
    async findUserById(id: string, locale?: LocaleType) {
        return await handleRequest({
            context: this.context,
            logger: this.logger,
            method: 'findById',
            id,
            locale,
            fn: async () => {
                return await this.prisma.user.findUnique({
                    where: { id },
                });
            },
        });
    }
}
