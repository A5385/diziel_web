import { Body, Controller, Get, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GetCurrentUserId } from 'src/decorator/current-user-id.decorator';
import { Public } from 'src/decorator/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RTGuard } from './rt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Public()
    @Post('check-email')
    async checkEmail(@Body('email') email: string) {
        if (!email) throw new NotFoundException('Email is required');
        return await this.authService.checkEmail(email);
    }
    @Public()
    @Post('login')
    async login(@Body('dto') dto: LoginDto, @Req() req: Request) {
        if (!dto.email && !dto.password) throw new NotFoundException('Login credentials not found');
        return await this.authService.login(dto, req);
    }
    @UseGuards(RTGuard)
    @Public()
    @Get('refresh')
    async refreshToken(@GetCurrentUserId() userId: string) {
        if (userId) {
            return this.authService.refreshToken(userId);
        }
    }
}
