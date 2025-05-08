import { Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LoggerService, PrismaService } from 'src/app/shared/services';
import { TranslateService } from 'src/app/shared/services/locale.service';
import { AppConfig } from 'src/config';
import { RequestHandler } from 'src/handlers/request-handler/request.handler';
import { ContextType } from 'src/handlers/request-handler/type';
import { deleteFile } from 'src/helper/DeleteFile';
import { GenerateUploadUrl } from 'src/helper/GenerateUploadUrl';
import { LocaleType } from 'src/types/response';
import { CreateDriverDto, DriverVisa } from './driver.dto';

@Injectable()
export class DriverService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly logger: LoggerService,
        private readonly i18n: I18nService,
        private readonly trans: TranslateService,
    ) {}

    private context: ContextType = 'driver';

    async create(
        { profileId, documents, ...dto }: CreateDriverDto,
        userId?: string,
        locale?: LocaleType,
    ) {
        if (profileId) {
            return await RequestHandler({
                method: 'create',
                context: this.context,
                i18n: this.i18n,
                locale,
                logger: this.logger,
                fn: async () => {
                    return await this.prisma.driver.create({
                        data: {
                            profile: { connect: { id: profileId } },
                            ...dto,
                            createdBy: { connect: { id: userId } },
                            documents: {
                                create: {
                                    drugTest: {
                                        create: {
                                            ...documents.drugTest,
                                            createdBy: { connect: { id: userId } },
                                        },
                                    },
                                    license: {
                                        create: {
                                            ...documents.license,
                                            createdBy: { connect: { id: userId } },
                                        },
                                    },
                                    ...(dto.driverType !== 'national' &&
                                        documents.passport && {
                                            passport: {
                                                create: {
                                                    number: documents.passport?.number ?? '',
                                                    createdBy: { connect: { id: userId } },
                                                },
                                            },
                                        }),
                                },
                            },
                        },
                        select: {
                            id: true,
                            documents: {
                                select: {
                                    id: true,
                                    drugTest: { select: { id: true } },
                                    license: { select: { id: true } },
                                    passport: {
                                        select: {
                                            id: true,
                                        },
                                    },
                                },
                            },
                        },
                    });
                },
            });
        }
    }

    async uploadCriminalRecord(id: string, file?: Express.Multer.File, locale?: LocaleType) {
        const context: ContextType = 'driverDocument';
        const documents = await this.prisma.driverDocuments.findUnique({
            where: { id },
            select: {
                criminalRecord: true,
            },
        });

        if (!documents) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context },
                    locale,
                }),
            );
        }

        const oldImageUrl = documents?.criminalRecord;
        const folder = AppConfig.imageFolder.criminalRecord;

        return await RequestHandler({
            method: 'update',
            context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let criminalRecord: string | null = null;

                if (file) {
                    const fileName = file.filename;
                    criminalRecord = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldImageUrl && criminalRecord !== oldImageUrl) {
                        await deleteFile({ url: oldImageUrl, folder });
                    }
                }

                if (!criminalRecord) return;

                return await this.prisma.driverDocuments.update({
                    where: { id },
                    data: {
                        ...(criminalRecord && { criminalRecord }),
                    },
                });
            },
        });
    }

    async uploadDrugTest(id: string, file?: Express.Multer.File, locale?: LocaleType) {
        const context: ContextType = 'drugTest';
        const drugTest = await this.prisma.drugTest.findUnique({
            where: { id },
            select: {
                testImage: true,
            },
        });

        if (!drugTest) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context },
                    locale,
                }),
            );
        }

        const oldImageUrl = drugTest?.testImage;
        const folder = AppConfig.imageFolder.drugTest;

        return await RequestHandler({
            method: 'update',
            context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let testImage: string | null = null;

                if (file) {
                    const fileName = file.filename;
                    testImage = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldImageUrl && testImage !== oldImageUrl) {
                        await deleteFile({ url: oldImageUrl, folder });
                    }
                }

                if (!testImage) return;

                return await this.prisma.drugTest.update({
                    where: { id },
                    data: {
                        ...(testImage && { testImage }),
                    },
                });
            },
        });
    }

    async uploadDriverLicense(
        id: string,
        {
            faceFile,
            backFile,
        }: {
            faceFile?: Express.Multer.File;
            backFile?: Express.Multer.File;
        },
        locale?: LocaleType,
    ) {
        const context: ContextType = 'driverLicense';
        const license = await this.prisma.driverLicense.findUnique({
            where: { id },
            select: {
                face: true,
                back: true,
            },
        });

        if (!license) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context },
                    locale,
                }),
            );
        }

        const oldFaceUrl = license?.face;
        const oldBackUrl = license?.back;

        const folder = AppConfig.imageFolder.driverLicense;

        return await RequestHandler({
            method: 'update',
            context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let face: string | null = null;
                let back: string | null = null;

                if (faceFile) {
                    const fileName = faceFile.filename;
                    face = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldFaceUrl && face !== oldFaceUrl) {
                        await deleteFile({
                            url: oldFaceUrl,
                            folder,
                        });
                    }
                }

                if (backFile) {
                    const fileName = backFile.filename;
                    back = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldBackUrl && back !== oldBackUrl) {
                        await deleteFile({
                            url: oldBackUrl,
                            folder,
                        });
                    }
                }

                if (!face && !back) return;

                return await this.prisma.driverLicense.update({
                    where: { id },
                    data: {
                        ...(face && { face }),
                        ...(back && { back }),
                    },
                });
            },
        });
    }

    async uploadDriverPassport(
        id: string,
        {
            faceFile,
            backFile,
        }: {
            faceFile?: Express.Multer.File;
            backFile?: Express.Multer.File;
        },
        locale?: LocaleType,
    ) {
        const context: ContextType = 'driverPassport';
        const passport = await this.prisma.passport.findUnique({
            where: { id },
            select: {
                face: true,
                back: true,
            },
        });

        if (!passport) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context },
                    locale,
                }),
            );
        }

        const oldFaceUrl = passport?.face;
        const oldBackUrl = passport?.back;

        const folder = AppConfig.imageFolder.driverPassport;

        return await RequestHandler({
            method: 'update',
            context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let face: string | null = null;
                let back: string | null = null;

                if (faceFile) {
                    const fileName = faceFile.filename;
                    face = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldFaceUrl && face !== oldFaceUrl) {
                        await deleteFile({
                            url: oldFaceUrl,
                            folder,
                        });
                    }
                }

                if (backFile) {
                    const fileName = backFile.filename;
                    back = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldBackUrl && back !== oldBackUrl) {
                        await deleteFile({
                            url: oldBackUrl,
                            folder,
                        });
                    }
                }

                if (!face && !back) return;

                return await this.prisma.passport.update({
                    where: { id },
                    data: {
                        ...(face && { face }),
                        ...(back && { back }),
                    },
                });
            },
        });
    }

    async createVisa({ passportId, ...dto }: DriverVisa, userId?: string, locale?: LocaleType) {
        const context: ContextType = 'visa';
        return await RequestHandler({
            method: 'create',
            context,
            logger: this.logger,
            i18n: this.i18n,
            locale,
            fn: async () => {
                return await this.prisma.visa.create({
                    data: {
                        ...dto,
                        passport: { connect: { id: passportId } },
                        createdBy: { connect: { id: userId } },
                    },
                    select: { id: true },
                });
            },
        });
    }

    async uploadVisaImage(id: string, file?: Express.Multer.File, locale?: LocaleType) {
        const visa = await this.prisma.visa.findUnique({
            where: { id },
            select: {
                image: true,
            },
        });

        if (!visa) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        const oldImageUrl = visa?.image;
        const folder = AppConfig.imageFolder.visaImage;

        return await RequestHandler({
            method: 'update',
            context: 'visa',
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let image: string | null = null;

                if (file) {
                    const fileName = file.filename;
                    image = GenerateUploadUrl({
                        folder,
                        fileName,
                    });

                    if (oldImageUrl && image !== oldImageUrl) {
                        await deleteFile({ url: oldImageUrl, folder });
                    }
                }

                if (!image) return;

                return await this.prisma.visa.update({
                    where: { id },
                    data: {
                        ...(image && { image }),
                    },
                });
            },
        });
    }
}
