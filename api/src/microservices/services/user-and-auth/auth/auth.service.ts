import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { FormatError } from 'src/helper/FormatError';
import { ContextType, generateResponse, mapStatusCode } from 'src/helper/handleRequest';
import { comparePassword } from 'src/helper/pwd-manager';
import { translations } from 'src/helper/translations';
import { UserService } from 'src/microservices/services/user-and-auth/user/user.service';
import { EnvConfigService } from 'src/microservices/shared/env-config/env-config.service';
import { LoggerService } from 'src/microservices/shared/logger/logger.service';
import { PrismaService } from 'src/microservices/shared/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggerService,
        private readonly envConfig: EnvConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}
    private readonly context: ContextType = 'auth';

    async checkEmail(email: string) {
        const user = await this.userService.findUserByEmail(email);
        if (user && user.data) {
            return user;
        } else {
            return await this.userService.create(email);
        }
    }
    async login(dto: LoginDto, req: Request) {
        const email = dto.email;
        const password = dto.password;
        const isUserValid = await this.validateUser(email, password);
        // console.log('🚀 >  AuthService >  login >  isUserValid:', isUserValid);

        if (isUserValid?.blocked)
            throw new UnauthorizedException('You are blocked please contact Admin');

        if (isUserValid) {
            const lastLoginIp =
                req.headers['x-forwarded-for']?.toString().split(',')[0] ||
                req.socket.remoteAddress;

            const lastLoginDevice = req.headers['user-agent'] || 'unknown';

            const updateUser = await this.prisma.user.update({
                where: { id: isUserValid.id },
                data: {
                    lastLogin: new Date(),
                    lastLoginIp,
                    lastLoginDevice,
                },
            });

            if (updateUser) {
                const accessToken = this.issueAccessToken({
                    payload: isUserValid,
                });
                const refreshToken = this.issueRefreshToken(isUserValid.id);
                if (accessToken && refreshToken) {
                    return generateResponse({
                        ok: true,
                        status: mapStatusCode['success'].login,
                        message: translations['en'].success.login,
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
                payload: { id: user.id, email: user.email, role: user.role },
            });
            const refreshToken = this.issueRefreshToken(user.id);

            if (accessToken && refreshToken)
                return generateResponse({
                    ok: true,
                    status: mapStatusCode['success'].login,
                    message: translations['en'].success.login,
                    data: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                });
        }
    }
    private async validateUser(
        email: string,
        password: string,
    ): Promise<{
        id: string;
        email: string;
        role: UserRole;
        blocked: boolean;
        verified: Date | null;
        lastLogin: Date | null;
    }> {
        if (!email || !password) throw new NotFoundException('Invalid Credentials.');

        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                hashedPassword: true,
                email: true,
                id: true,
                role: true,
                blocked: true,
                verified: true,
                lastLogin: true,
                lastLoginAttempt: true,
                retryCount: true, // Fetch the lastLoginAttempt timestamp
            },
        });

        if (!user) throw new NotFoundException('User does not exist.');

        // Check if the retry count should be reset
        const timeDifferenceInMinutes =
            (new Date().getTime() - new Date(user?.lastLoginAttempt ?? '').getTime()) / (1000 * 60);
        if (timeDifferenceInMinutes > 2) {
            // Reset retry count if more than 5 minutes have passed
            await this.prisma.user.update({
                where: { email },
                data: {
                    retryCount: 0,
                    lastLoginAttempt: new Date(), // Update the last login attempt timestamp
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
                where: { email },
                data: {
                    retryCount: { increment: 1 },
                    lastLoginAttempt: new Date(), // Update the last login attempt timestamp
                },
            });
            throw new NotFoundException('Invalid credentials.');
        }

        const role = user?.role;
        return {
            id: user?.id,
            email,
            role,
            blocked: user.blocked,
            verified: user.verified,
            lastLogin: user.lastLogin,
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
                this.logger.info({
                    message: `New Access Token Generated Successfully`,
                    context: this.context,
                });
                return accessToken;
            }
        } catch (error) {
            this.logger.error({
                message: 'Generate token error',
                context: this.context,

                trace: FormatError((error as Error).stack),
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
                this.logger.info({
                    message: `New Refresh Token Generated Successfully`,
                    context: this.context,
                });

                return refreshToken;
            }
        } catch (error) {
            this.logger.error({
                message: 'Generate token error',
                context: this.context,
                trace: FormatError((error as Error).stack),
            });
            throw new InternalServerErrorException('Failed to generate tokens', {
                cause: new Error(),
                description: (error as Error).message,
            });
        }
    }
}
