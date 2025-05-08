import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AppConfig } from 'src/config';
import { GetCurrentUserId } from 'src/decorator/current-user-id.decorator';
import { GetLocale } from 'src/decorator/get-locale.decorator';
import { GenerateMulterOption } from 'src/helper/GenerateMulterOptions';
import { LocaleType } from 'src/types/response';
import { CreateDriverDto, DriverVisa } from './driver.dto';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) {}

    @ApiBody({ type: CreateDriverDto })
    @Post('create')
    async create(
        @Body('dto') dto: CreateDriverDto,
        @GetCurrentUserId() userId?: string,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.driverService.create(dto, userId, locale);
    }

    @Patch('upload-criminal-record/:id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor(
            'file',
            GenerateMulterOption({
                type: 'file',
                folder: AppConfig.imageFolder.criminalRecord,
            }),
        ),
    )
    async uploadCriminalRecord(
        @Param('id') id: string,
        @UploadedFile('file') file: Express.Multer.File,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.driverService.uploadCriminalRecord(id, file, locale);
    }

    @Patch('upload-drug-test/:id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor(
            'file',
            GenerateMulterOption({
                type: 'file',
                folder: AppConfig.imageFolder.drugTest,
            }),
        ),
    )
    async uploadDrugTest(
        @Param('id') id: string,
        @UploadedFile('file') file: Express.Multer.File,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.driverService.uploadDrugTest(id, file, locale);
    }

    @Patch('upload-driver-license/:id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'faceFile', maxCount: 1 },
                { name: 'backFile', maxCount: 1 },
            ],
            GenerateMulterOption({ type: 'image', folder: AppConfig.imageFolder.driverLicense }),
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                faceFile: { type: 'string', format: 'binary' },
                backFile: { type: 'string', format: 'binary' },
            },
        },
    })
    async uploadDriverLicense(
        @Param('id') id: string,
        @UploadedFiles()
        files: {
            faceFile?: Express.Multer.File[];
            backFile?: Express.Multer.File[];
        },
        @GetLocale() locale?: LocaleType,
    ) {
        const faceFile = files.faceFile?.[0];
        const backFile = files.backFile?.[0];

        return await this.driverService.uploadDriverLicense(
            id,
            {
                faceFile,
                backFile,
            },
            locale,
        );
    }

    @Patch('upload-driver-passport/:id')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'faceFile', maxCount: 1 },
                { name: 'backFile', maxCount: 1 },
            ],
            GenerateMulterOption({ type: 'image', folder: AppConfig.imageFolder.driverPassport }),
        ),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                faceFile: { type: 'string', format: 'binary' },
                backFile: { type: 'string', format: 'binary' },
            },
        },
    })
    async uploadDriverPassport(
        @Param('id') id: string,
        @UploadedFiles()
        files: {
            faceFile?: Express.Multer.File[];
            backFile?: Express.Multer.File[];
        },
        @GetLocale() locale?: LocaleType,
    ) {
        const faceFile = files.faceFile?.[0];
        const backFile = files.backFile?.[0];

        return await this.driverService.uploadDriverPassport(
            id,
            {
                faceFile,
                backFile,
            },
            locale,
        );
    }

    @ApiBody({ type: DriverVisa })
    @Post('create-visa')
    async createVisa(
        @Body('dto') dto: DriverVisa,
        @GetCurrentUserId() userId?: string,
        locale?: LocaleType,
    ) {
        return await this.driverService.createVisa(dto, userId, locale);
    }

    @Patch('upload-visa-image/:id')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor(
            'file',
            GenerateMulterOption({
                type: 'file',
                folder: AppConfig.imageFolder.visaImage,
            }),
        ),
    )
    async uploadVisaImage(
        @Param('id') id: string,
        @UploadedFile('file') file: Express.Multer.File,
        @GetLocale() locale?: LocaleType,
    ) {
        return await this.driverService.uploadVisaImage(id, file, locale);
    }
}
