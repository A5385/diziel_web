import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LoggerService, PrismaService } from 'src/app/shared/services';
import { TranslateService } from 'src/app/shared/services/locale.service';
import { AppConfig } from 'src/config';
import { RequestHandler } from 'src/handlers/request-handler/request.handler';
import { ContextType } from 'src/handlers/request-handler/type';
import { deleteFile } from 'src/helper/DeleteFile';
import { GenerateUploadUrl } from 'src/helper/GenerateUploadUrl';
import { LocaleType } from 'src/types/response';
import { UpdateProfileAddressDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        private readonly i18n: I18nService,
        private readonly logger: LoggerService,
        private readonly prisma: PrismaService,
        private readonly trans: TranslateService,
    ) {}
    private context: ContextType = 'profile';

    async update(id: string, dto: UpdateProfileDto, locale?: LocaleType) {
        const profile = await this.prisma.profile.findUnique({ where: { id } });
        if (!profile) throw new ConflictException('Profile no longer exist');

        const emailExist = await this.prisma.profile.findUnique({ where: { email: dto?.email } });
        if (emailExist) throw new ConflictException('Email already exist.');

        return await RequestHandler({
            method: 'update',
            context: this.context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () =>
                await this.prisma.profile.update({
                    where: { id },
                    data: {
                        ...dto,
                        profileComplete: new Date(),
                    },
                }),
        });
    }

    async uploadNationalImages(
        id: string,
        {
            nationalFaceFile,
            nationalBackFile,
        }: {
            nationalFaceFile?: Express.Multer.File;
            nationalBackFile?: Express.Multer.File;
        },
        locale?: LocaleType,
    ) {
        const profile = await this.prisma.profile.findUnique({
            where: { id },
            select: {
                national: { select: { face: true, back: true } },
                user: { select: { role: true } },
            },
        });

        if (!profile) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        const oldFaceUrl = profile?.national?.face;
        const oldBackUrl = profile?.national?.back;

        const folder = AppConfig.imageFolder.nationalId;

        return await RequestHandler({
            method: 'update',
            context: this.context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let face: string | null = null;
                let back: string | null = null;

                if (nationalFaceFile) {
                    const fileName = nationalFaceFile.filename;
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

                if (nationalBackFile) {
                    const fileName = nationalBackFile.filename;
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

                return await this.prisma.nationalIdentity.update({
                    where: { profileId: id },
                    data: {
                        ...(face && { face }),
                        ...(back && { back }),
                    },
                });
            },
        });
    }

    async updateProfileAddress(id: string, dto: UpdateProfileAddressDto, locale?: LocaleType) {
        if (id) {
            const profile = await this.prisma.profile.findUnique({
                where: { id },
                include: { address: true },
            });
            if (!profile) throw new NotFoundException(`Profile with id:${id} is no longer exist.`);

            if (profile?.address) {
                return await RequestHandler({
                    method: 'update',
                    context: 'address',
                    logger: this.logger,
                    locale,
                    i18n: this.i18n,
                    id: profile?.address?.id,
                    fn: async () => {
                        return await this.prisma.address.update({
                            where: { id: profile?.address?.id },
                            data: { ...dto },
                        });
                    },
                });
            } else {
                return await RequestHandler({
                    method: 'create',
                    context: 'address',
                    locale,
                    i18n: this.i18n,
                    logger: this.logger,
                    fn: async () => {
                        return await this.prisma.address.create({
                            data: { ...dto, profile: { connect: { id } } },
                        });
                    },
                });
            }
        }
    }

    async uploadProfileImage(
        id: string,
        file?: Express.Multer.File,

        locale?: LocaleType,
    ) {
        const profile = await this.prisma.profile.findUnique({
            where: { id },
            select: {
                image: true,

                user: { select: { role: true } },
            },
        });

        if (!profile) {
            throw new NotFoundException(
                this.trans.translate({
                    path: 'error.not-fount',
                    args: { context: this.context },
                    locale,
                }),
            );
        }

        const oldImageUrl = profile?.image;
        const folder = AppConfig.imageFolder.profileImage;

        return await RequestHandler({
            method: 'update',
            context: this.context,
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

                return await this.prisma.profile.update({
                    where: { id },
                    data: {
                        ...(image && { image }),
                    },
                    include: {
                        national: true,
                    },
                });
            },
        });
    }
}
