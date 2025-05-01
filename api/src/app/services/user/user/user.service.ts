import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { LoggerService, PrismaService } from 'src/app/shared/services';
import { hashPassword } from 'src/handlers/password.handler';
import { RequestHandler } from 'src/handlers/request-handler/request.handler';
import { ContextType } from 'src/handlers/request-handler/type';
import { GenerateOTP } from 'src/helper/GenerateOTP';
import { LocaleType } from 'src/types/response';
import { SetPasswordDto } from './dto/set-passowrd.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggerService,
        private readonly i18n: I18nService,
    ) {}
    private readonly context: ContextType = 'user';

    async test() {
        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            method: 'findAll',
            i18n: this.i18n,
            fn: async () => {
                return await this.prisma.user.findMany({});
            },
        });
    }

    async create(phone: string, role: UserRole = 'owner', locale?: LocaleType) {
        const user = await this.findUserByEmail(phone, locale);
        if (user.data) throw new ConflictException('User already exists');

        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            method: 'create',
            locale,
            fn: async () => {
                const newUser = await this.prisma.user.create({
                    data: { phone, role },
                });
                if (newUser) {
                    const tenterOtp = GenerateOTP(6);

                    // Send OTP to user phone

                    const updateUser = await this.prisma.user.update({
                        where: { id: newUser.id },
                        data: { otp: tenterOtp.toString() },
                    });
                    return updateUser;
                }
            },
        });
    }

    async verifyOtp({ phone, otp }: VerifyOtpDto, locale?: LocaleType) {
        const { data: user } = await this.findUserByEmail(phone, locale);

        if (!user) throw new NotFoundException('User no longer exist');

        const isValidOtp = user.otp === otp;

        if (!isValidOtp) throw new ConflictException('Invalid OTP');

        return await RequestHandler({
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

    async setPassword({ password, phone }: SetPasswordDto, locale?: LocaleType) {
        const { data: user } = await this.findUserByEmail(phone, locale);

        if (!user) throw new NotFoundException('User no longer exist');

        return await RequestHandler({
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
                        passwordSet: new Date(),
                    },
                });
                return updatedUser;
            },
        });
    }

    async findUserByEmail(phone: string, locale?: LocaleType) {
        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            method: 'findBy',
            key: 'email',
            value: phone,
            locale,
            fn: async () => {
                return await this.prisma.user.findUnique({
                    where: { phone },
                });
            },
        });
    }
    async findUserById(id: string, locale?: LocaleType) {
        return await RequestHandler({
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
