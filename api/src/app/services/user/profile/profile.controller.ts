import {
    Body,
    Controller,
    Param,
    Patch,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AppConfig } from 'src/config';
import { GetLocale } from 'src/decorator/get-locale.decorator';
import { GenerateMulterOption } from 'src/helper/GenerateMulterOptions';
import { LocaleType } from 'src/types/response';
import { UpdateProfileAddressDto, UpdateProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @ApiBody({ type: UpdateProfileDto })
    @Patch('update/:id')
    async update(
        @Param('id') id: string,
        @Body('dto') dto: UpdateProfileDto,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.profileService.update(id, dto, locale);
    }
    @ApiBody({ type: UpdateProfileAddressDto })
    @Patch('update-profile-address/:id')
    async updateProfileAddress(
        @Param('id') id: string,
        @Body('dto') dto: UpdateProfileAddressDto,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.profileService.updateProfileAddress(id, dto, locale);
    }

    @Patch('upload-profile-image/:id')
    @UseInterceptors(
        FileInterceptor(
            'file',
            GenerateMulterOption({
                type: 'file',
                folder: AppConfig.imageFolder.profileImage,
            }),
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    async uploadProfileImage(
        @Param('id') id: string,
        @UploadedFile('file') file: Express.Multer.File,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.profileService.uploadProfileImage(id, file, locale);
    }

    @Patch('upload-national-images/:id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'nationalFace', maxCount: 1 },
                { name: 'nationalBack', maxCount: 1 },
            ],
            GenerateMulterOption({ type: 'image', folder: AppConfig.imageFolder.nationalId }),
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nationalFace: { type: 'string', format: 'binary' },
                nationalBack: { type: 'string', format: 'binary' },
            },
        },
    })
    async uploadNationalImages(
        @Param('id') id: string,
        @UploadedFiles()
        files: {
            nationalFace?: Express.Multer.File[];
            nationalBack?: Express.Multer.File[];
        },
        @GetLocale() locale?: LocaleType,
    ) {
        const nationalFaceFile = files.nationalFace?.[0];
        const nationalBackFile = files.nationalBack?.[0];

        return await this.profileService.uploadNationalImages(
            id,
            {
                nationalFaceFile,
                nationalBackFile,
            },
            locale,
        );
    }
}
