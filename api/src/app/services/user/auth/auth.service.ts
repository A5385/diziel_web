import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInfo, User } from '@prisma/client';
import { Request } from 'express';
import { UserService } from 'src/app/services/user/user/user.service';
import { EnvConfigService, LoggerService, PrismaService } from 'src/app/shared/services';
import { comparePassword } from 'src/handlers/password.handler';

import { I18nService } from 'nestjs-i18n';
import { generateResponse } from 'src/handlers/request-handler/request.handler';
import { mapStatusCode } from 'src/handlers/request-handler/status.code';
import { ContextType } from 'src/handlers/request-handler/type';
import { LocaleType } from 'src/types/response';
import { RegisterUserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggerService,
        private readonly envConfig: EnvConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly i18n: I18nService,
    ) {}
    private readonly context: ContextType = 'auth';

    async checkEmail(dto: RegisterUserDto, locale?: LocaleType) {
        const user = await this.userService.findUserByPhone(dto.phone);
        if (user && user.data) {
            return user;
        } else {
            return await this.userService.register(dto, locale);
        }
    }

    async login(dto: LoginDto, req: Request) {
        const phone = dto.phone;
        const password = dto.password;
        const isUserValid = await this.validateUser(phone, password);
        // console.log('🚀 >  AuthService >  login >  isUserValid:', isUserValid);

        if (isUserValid?.blocked)
            throw new UnauthorizedException('You are blocked please contact Admin');

        if (isUserValid) {
            const lastLoginIp =
                req.headers['x-forwarded-for']?.toString().split(',')[0] ||
                req.socket.remoteAddress;

            const lastLoginDevice = req.headers['user-agent'] || 'unknown';

            const loginInfo = await this.prisma.loginInfo.update({
                where: { userId: isUserValid.id },
                data: {
                    lastLogin: new Date(),
                    lastLoginIp,
                    lastLoginDevice,
                    lastLoginAttempt: new Date(),
                },
            });

            if (loginInfo) {
                const accessToken = this.issueAccessToken({
                    payload: isUserValid,
                });
                const refreshToken = this.issueRefreshToken(isUserValid?.id ?? '');
                if (accessToken && refreshToken) {
                    return generateResponse({
                        ok: true,
                        status: mapStatusCode['success'].login,
                        message: this.i18n.t(`success.login`, { lang: 'en' }),
                        data: {
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            ...isUserValid,
                        },
                    });
                }
            }
        }
    }

    async refreshToken(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (user) {
            const accessToken = this.issueAccessToken({
                payload: { id: user.id, email: user.phone, role: user.role },
            });
            const refreshToken = this.issueRefreshToken(user.id);

            if (accessToken && refreshToken)
                return generateResponse({
                    ok: true,
                    status: mapStatusCode['success'].login,
                    message: this.i18n.t(`success.login`, { lang: 'en' }),
                    data: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                });
        }
    }
    private async validateUser(
        phone: string,
        password: string,
    ): Promise<Partial<User & LoginInfo>> {
        if (!phone || !password) throw new NotFoundException('Invalid Credentials.');

        const user = await this.prisma.user.findUnique({
            where: { phone },
            select: {
                hashedPassword: true,
                phone: true,
                id: true,
                role: true,
                blocked: true,
                verified: true,
                retryCount: true, //} Fetch the lastLoginAttempt timestamp
                loginInfo: {
                    select: {
                        lastLogin: true,
                        lastLoginAttempt: true,
                    },
                },
            },
        });

        if (!user) throw new NotFoundException('User does not exist.');

        // Check if the retry count should be reset
        const timeDifferenceInMinutes =
            (new Date().getTime() - new Date(user?.loginInfo?.lastLoginAttempt ?? '').getTime()) /
            (1000 * 60);
        if (timeDifferenceInMinutes > 2) {
            // Reset retry count if more than 5 minutes have passed
            await this.prisma.user.update({
                where: { phone },
                data: {
                    retryCount: 0,
                    loginInfo: {
                        update: {
                            data: {
                                lastLoginAttempt: new Date(), // Update the last login attempt timestamp
                            },
                        },
                    },
                },
            });
        }

        // If password retry count is 5 or more, prevent login attempts
        if (user.retryCount >= 5) {
            throw new UnauthorizedException('Login attempt limit has been exceeded.');
        }

        // Compare password
        if (!(await comparePassword(user?.hashedPassword ?? '', password))) {
            // Increment the retry count and update the last login attempt timestamp
            await this.prisma.user.update({
                where: { phone },
                data: {
                    retryCount: { increment: 1 },
                    loginInfo: {
                        update: {
                            data: {
                                lastLoginAttempt: new Date(), // Update the last login attempt timestamp
                            },
                        },
                    },
                },
            });
            throw new NotFoundException('Invalid credentials.');
        }

        const role = user?.role;
        return {
            id: user?.id,
            phone,
            role,
            blocked: user.blocked,
            verified: user.verified,
            lastLogin: user?.loginInfo?.lastLogin ?? null,
        };
    }

    issueAccessToken({ payload, expIn }: { payload: Buffer | object; expIn?: string | number }) {
        try {
            const config = {
                expiresIn: expIn ? expIn : this.envConfig.getAccessTokenExpTime(),
                secret: this.envConfig.getAccessTokenSecret(),
            };

            const accessToken = this.jwtService.sign(payload, config);
            if (accessToken) {
                this.logger.success('token', {
                    token: 'access',
                    context: this.context,
                });
                return accessToken;
            }
        } catch (error) {
            this.logger.error('token', {
                error: error as Error,
                token: 'access',
                context: this.context,
            });
            throw new InternalServerErrorException('Failed to generate tokens', {
                cause: new Error(),
                description: (error as Error).message,
            });
        }
    }

    issueRefreshToken(id: string) {
        try {
            const config = {
                expiresIn: this.envConfig.getRefreshTokenExpTime(),
                secret: this.envConfig.getRefreshTokenSecret(),
            };

            const payload = { sub: id };

            const refreshToken = this.jwtService.sign(payload, config);

            if (refreshToken) {
                this.logger.success('token', {
                    token: 'refresh',
                    context: this.context,
                });
                return refreshToken;
            }
        } catch (error) {
            this.logger.error('token', {
                error: error as Error,
                token: 'refresh',
                context: this.context,
            });
            throw new InternalServerErrorException('Failed to generate tokens', {
                cause: new Error(),
                description: (error as Error).message,
            });
        }
    }
}
