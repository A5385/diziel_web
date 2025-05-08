import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { EnvConfigService } from 'src/app/shared/services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private envConfig: EnvConfigService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        // Check if the request has a valid API key
        const isApiKeyValid = this.extractApiKeyFromHeader(request);

        // If the API key is present and valid, allow the request to proceed
        if (!isApiKeyValid) throw new UnauthorizedException('Invalid API key');
        // If it's a public route, skip the authentication
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        // Check if the JWT token is present
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token provided: Please login');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.envConfig.getAccessTokenSecret(),
            });
            request['user'] = payload;
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Token expired');
            } else {
                throw new UnauthorizedException('Invalid token');
            }
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // const [type, token] = request.headers.authorization?.split(' ') ?? [];
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        // console.log('🚀 >  AuthGuard >  extractTokenFromHeader >  token:', token);

        if (type === 'Bearer' && token) {
            return token; // Prioritize token from Authorization header
        }

        if (request.cookies && 'access_token' in request.cookies) {
            return request.cookies.access_token;
        }

        return undefined; // Fallback if no token is found
    }

    private extractApiKeyFromHeader(request: Request): boolean {
        const headerApiKey = request.headers['x-api-key'] as string;

        // Check if either API key (from cookies or headers) is present
        if (!headerApiKey) {
            console.error('API key is missing in both the headers and cookies');
            throw new UnauthorizedException('API key is required');
        }

        const storedKey = this.envConfig.getApiKey();

        // If either cookiesApikey or headerApiKey matches the stored key, allow access
        if (storedKey === headerApiKey) {
            return true;
        } else {
            console.error(`API key mismatch: expected header: ${headerApiKey}`);
            return false;
        }
    }
}
