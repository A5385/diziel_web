import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, User, UserRole } from '@prisma/client';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { LoggerService, PrismaService } from 'src/app/shared/services';
import { TranslateService } from 'src/app/shared/services/locale.service';
import { localeKey } from 'src/decorator/get-locale.decorator';
import { hashPassword } from 'src/handlers/password.handler';
import { ExtractAllFromReq, generateDataFilterResponse } from 'src/handlers/query-param.handler';
import { RequestHandler } from 'src/handlers/request-handler/request.handler';
import { ContextType } from 'src/handlers/request-handler/type';
import { GenerateOTP } from 'src/helper/GenerateOTP';
import { LocaleType } from 'src/types/response';
import { RegisterUserDto, SetPasswordDto, VerifyOtpDto, VerifyPhoneDto } from './dto/user.dto';
import { UserRegisterResponse } from './user.type';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggerService,
        private readonly i18n: I18nService,
        private readonly trans: TranslateService,
    ) {}

    private readonly context: ContextType = 'user';

    async register({ phone, role, nationalIdNumber }: RegisterUserDto, locale?: LocaleType) {
        const res = await this.findUserByPhone(phone, locale);
        const user = res?.data;
        if (user) {
            throw new ConflictException(
                this.trans.translate({
                    path: 'error.record-exists',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        return await RequestHandler<UserRegisterResponse | undefined, 'create'>({
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            locale,
            method: 'create',
            fn: async () => {
                const newUser = await this.prisma.user.create({
                    data: {
                        phone,
                        role,
                        profile: {
                            create: {
                                national: nationalIdNumber ? { create: { nationalIdNumber } } : {},
                            },
                        },
                        loginInfo: { create: {} },
                    },
                    select: {
                        id: true,
                        phone: true,
                        profile: {
                            select: {
                                id: true,
                                national: { select: { nationalIdNumber: true, id: true } },
                            },
                        },
                    },
                });
                if (newUser) {
                    return {
                        id: newUser?.id,
                        phone: newUser?.id,
                        profileId: newUser?.profile?.id,
                        nationalId: newUser?.profile?.national?.id,
                        nationalIdNumber: newUser?.profile?.national?.nationalIdNumber,
                    };
                }
            },
        });
    }

    async verifyPhone({ phone }: VerifyPhoneDto, locale?: LocaleType) {
        const res = await this.findUserByPhone(phone, locale);
        const user = res?.data;

        if (!user) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            method: 'verify-phone',
            phone,
            fn: async () => {
                const otp = GenerateOTP(6).toString();
                return await this.prisma.user.update({ where: { phone }, data: { otp } });
            },
        });
    }

    async verifyOtp({ phone, otp }: VerifyOtpDto, locale?: LocaleType) {
        const res = await this.findUserByPhone(phone, locale, { otp: true });
        const user = res?.data;

        if (!user)
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context: this.context },
                    locale,
                }),
            );

        const isValidOtp = user.otp === otp;

        if (!isValidOtp)
            throw new ConflictException(
                this.trans.translate({
                    path: 'error.invalid-otp',
                    args: { context: this.context },
                    locale,
                }),
            );

        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            method: 'verify-otp',
            phone,
            locale,
            fn: async () => {
                const updatedUser = await this.prisma.user.update({
                    where: { phone },
                    data: { otp: null, verified: new Date() },
                });
                return updatedUser;
            },
        });
    }

    async setPassword(
        { newPassword, confirmPassword, phone }: SetPasswordDto,
        locale?: LocaleType,
    ) {
        const res = await this.findUserByPhone(phone, locale);
        const user = res?.data;

        if (!user) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        if (newPassword !== confirmPassword) {
            throw new BadRequestException(
                this.trans.translate({
                    path: 'error.password-not-match',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            method: 'set-password',
            phone,
            locale,
            fn: async () => {
                const updatedUser = await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        hashedPassword: await hashPassword(newPassword),
                        passwordSet: new Date(),
                    },
                });
                return updatedUser;
            },
        });
    }

    async findUserByPhone(phone: string, locale?: LocaleType, select?: Prisma.UserSelect) {
        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            method: 'findBy',
            key: 'phone',
            value: phone,
            locale,
            fn: async () => {
                const user = await this.prisma.user.findUnique({
                    where: { phone },
                    ...(select && { select }),
                });

                if (user) return user;
            },
        });
    }

    async findUserById(id: string, locale?: LocaleType, select: Prisma.UserSelect = {}) {
        return await RequestHandler({
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            method: 'findById',
            id,
            locale,
            fn: async () => {
                return await this.prisma.user.findUnique({
                    where: { id },
                    select,
                });
            },
        });
    }

    async findAll(req: Request) {
        return await RequestHandler({
            method: 'findAll',
            context: this.context,
            logger: this.logger,
            i18n: this.i18n,
            locale: req.cookies[localeKey],
            fn: async () => {
                const { queries, startDate, endDate, limit, page, orderBy } = ExtractAllFromReq<
                    User & { fullName: string }
                >(req, ['id', 'phone', 'role', 'fullName']);
                const { phone, id, role, fullName } = queries;

                const where: Prisma.UserWhereInput = {
                    ...(phone && {
                        phone: { contains: phone, mode: 'insensitive' },
                    }),
                    ...(id && {
                        id: { contains: id, mode: 'insensitive' },
                    }),
                    ...(role && {
                        role: { equals: role as UserRole },
                    }),
                    ...(fullName && {
                        profile: {
                            fullName: { contains: fullName, mode: 'insensitive' },
                        },
                    }),

                    ...((startDate || endDate) && {
                        createdAt: {
                            ...(startDate && { gte: new Date(startDate) }),
                            ...(endDate && { lte: new Date(endDate) }),
                        },
                    }),
                };
                const include: Prisma.UserInclude = {
                    profile: true,
                    complaints: true,
                    requests: true,
                };

                return generateDataFilterResponse({
                    model: 'user',
                    where,
                    prisma: this.prisma,
                    page,
                    limit,
                    orderBy,
                    include,
                });
            },
        });
    }

    async toggleBlockUser(id: string, userId?: string, locale?: LocaleType) {
        if (!id) throw new NotFoundException('User id is required');
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { blocked: true },
        });
        if (!user) throw new NotFoundException(`User with id:${id} no longer exist.`);

        return await RequestHandler({
            method: 'update',
            id,
            logger: this.logger,
            locale,
            i18n: this.i18n,
            context: this.context,
            fn: async () =>
                await this.prisma.user.update({
                    where: { id },
                    data: {
                        ...(userId && { updatedBy: { connect: { id: userId } } }),
                        blocked: user.blocked === true ? false : true,
                    },
                }),
        });
    }

    async delete(id: string, locale?: LocaleType) {
        if (id) {
            const exist = await this.prisma.user.findUnique({ where: { id } });
            if (!exist) throw new NotFoundException(`User with ID:${id} is no longer exist.`);

            return await RequestHandler<string, 'delete'>({
                method: 'delete',
                context: this.context,
                logger: this.logger,
                locale: locale,
                id,
                i18n: this.i18n,
                fn: async () => {
                    await this.prisma.user.delete({
                        where: { id: exist.id },
                    });

                    return 'Successfully Deleted User';
                },
            });
        }
    }
}
