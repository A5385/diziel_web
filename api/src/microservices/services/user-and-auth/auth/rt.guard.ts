import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EnvConfigService } from 'src/microservices/shared/env-config/env-config.service';

@Injectable()
export class RTGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private envConfig: EnvConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        // console.log('first token from rt guard :', token);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.envConfig.getRefreshTokenSecret(),
            });
            // console.log('payload from rt guard :', payload);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        if (request.cookies && 'refresh_token' in request.cookies) {
            return request.cookies.refresh_token;
        } else {
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            // console.log('🚀 >  RTGuard >  extractTokenFromHeader >  token:', token);

            return type === 'Refresh' ? token : undefined;
        }
    }
}
// import { AuthGuard } from '@nestjs/passport';

// export class RTGuard extends AuthGuard('rt') {
//   constructor() {
//     super();
//   }
// }
