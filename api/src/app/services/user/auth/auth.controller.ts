import { Body, Controller, Get, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { GetCurrentUserId } from 'src/decorator/current-user-id.decorator';
import { GetLocale } from 'src/decorator/get-locale.decorator';
import { Public } from 'src/decorator/public.decorator';
import { LocaleType } from 'src/types/response';
import { RegisterUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RTGuard } from './rt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Public()
    @ApiBody({ type: RegisterUserDto })
    @Post('check-email')
    async checkEmail(@Body('dto') dto: RegisterUserDto, @GetLocale() locale?: LocaleType) {
        if (!dto?.phone) throw new NotFoundException('Email is required');
        return await this.authService.checkEmail(dto, locale);
    }
    @Public()
    @Post('login')
    async login(@Body('dto') dto: LoginDto, @Req() req: Request) {
        if (!dto.phone && !dto.password) throw new NotFoundException('Login credentials not found');
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
