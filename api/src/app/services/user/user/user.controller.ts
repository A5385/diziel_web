import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { GetCurrentUserId } from 'src/decorator/current-user-id.decorator';
import { GetLocale } from 'src/decorator/get-locale.decorator';
import { Public } from 'src/decorator/public.decorator';
import { LocaleType } from 'src/types/response';
import { RegisterUserDto, SetPasswordDto, VerifyOtpDto, VerifyPhoneDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @ApiBody({ type: RegisterUserDto })
    @Post('register')
    async register(@Body('dto') dto: RegisterUserDto, @GetLocale() locale?: LocaleType) {
        if (dto) {
            return await this.userService.register(dto, locale);
        }
    }
    @Public()
    @ApiBody({ type: VerifyPhoneDto })
    @Post('verify-phone')
    async verifyPhone(@Body('dto') dto: VerifyPhoneDto, @GetLocale() locale?: LocaleType) {
        if (dto) {
            return await this.userService.verifyPhone(dto, locale);
        }
    }

    @Public()
    @Post('verify-otp')
    async verifyOtp(@Body('dto') dto: VerifyOtpDto, @GetLocale() locale?: LocaleType) {
        if (!dto.phone && !dto.otp) {
            throw new NotFoundException('Email or OTP not found');
        } else {
            return await this.userService.verifyOtp(dto, locale);
        }
    }
    @Public()
    @Post('set-password')
    async setPassword(@Body('dto') dto: SetPasswordDto, @GetLocale() locale?: LocaleType) {
        if (!dto.newPassword && !dto.phone) {
            throw new NotFoundException('Missing required data');
        } else {
            return await this.userService.setPassword(dto, locale);
        }
    }

    @Get('find-user-by-phone/:phone')
    async findUserByEmail(@Param('phone') phone: string, @GetLocale() locale?: LocaleType) {
        if (phone) return await this.userService.findUserByPhone(phone, locale);
    }
    @Get('find-user-by-id/:id')
    async findUserById(@Param('id') id: string, @GetLocale() locale?: LocaleType) {
        if (id) {
            return await this.userService.findUserById(id, locale);
        }
    }
    @Get('find-all')
    async findAll(@Req() req: Request) {
        return await this.userService.findAll(req);
    }

    @Patch('toggle-block/:id')
    async toggleBlockUser(
        @Param('id') id: string,
        @GetCurrentUserId() userId?: string,
        @GetLocale() locale?: LocaleType,
    ) {
        if (id) {
            return await this.userService.toggleBlockUser(id, userId, locale);
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string, @GetLocale() locale?: LocaleType) {
        if (id) {
            return await this.userService.delete(id, locale);
        }
    }
}
