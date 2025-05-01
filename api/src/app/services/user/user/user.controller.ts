import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { GetLocale } from 'src/decorator/get-locale.decorator';
import { Public } from 'src/decorator/public.decorator';
import { LocaleType } from 'src/types/response';
import { SetPasswordDto } from './dto/set-passowrd.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get('test')
    async test() {
        return await this.userService.test();
    }

    @Public()
    @Post('register')
    async create(@Body('email') email: string, @GetLocale() locale?: LocaleType) {
        if (email) {
            return await this.userService.create(email, 'owner', locale);
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
        if (!dto.password && !dto.phone) {
            throw new NotFoundException('Missing required data');
        } else {
            return await this.userService.setPassword(dto, locale);
        }
    }

    @Get('find-user-by-email/:email')
    async findUserByEmail(@Param('email') email: string, @GetLocale() locale?: LocaleType) {
        if (email) {
            return await this.userService.findUserByEmail(email, locale);
        }
    }
    @Get('find-user-by-id/:id')
    async findUserById(@Param('id') id: string, @GetLocale() locale?: LocaleType) {
        if (id) {
            return await this.userService.findUserById(id, locale);
        }
    }
}
