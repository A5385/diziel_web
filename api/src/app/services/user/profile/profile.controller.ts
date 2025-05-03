import { Body, Controller, Param, Patch, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { GetLocale } from 'src/decorator/get-locale.decorator';
import { GenerateMulterOption } from 'src/helper/GenerateMulterOptions';
import { LocaleType } from 'src/types/response';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @ApiBody({ type: UpdateProfileDto })
    @Patch('update/:phone')
    async update(
        @Param('phone') phone: string,
        @Body('dto') dto: UpdateProfileDto,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.profileService.update(phone, dto, locale);
    }

    @Patch('upload-all/:id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'avatar', maxCount: 1 },
                { name: 'nationalFace', maxCount: 1 },
                { name: 'nationalBack', maxCount: 1 },
            ],
            GenerateMulterOption({ type: 'image' }),
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                avatar: { type: 'string', format: 'binary' },
                nationalFace: { type: 'string', format: 'binary' },
                nationalBack: { type: 'string', format: 'binary' },
            },
        },
    })
    async uploadAllFiles(
        @Param('id') id: string,
        @UploadedFiles()
        files: {
            avatar?: Express.Multer.File[];
            nationalFace?: Express.Multer.File[];
            nationalBack?: Express.Multer.File[];
        },
        @GetLocale() locale?: LocaleType,
    ) {
        const avatarFile = files.avatar?.[0];
        const nationalFaceFile = files.nationalFace?.[0];
        const nationalBackFile = files.nationalBack?.[0];

        return await this.profileService.uploadAll(
            id,
            {
                avatarFile,
                nationalFaceFile,
                nationalBackFile,
            },
            locale,
        );
    }
}
