import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LoggerService, PrismaService } from 'src/app/shared/services';
import { TranslateService } from 'src/app/shared/services/locale.service';
import { RequestHandler } from 'src/handlers/request-handler/request.handler';
import { ContextType } from 'src/handlers/request-handler/type';
import { deleteFile } from 'src/helper/DeleteFile';
import { GenerateUploadUrl } from 'src/helper/GenerateUploadUrl';
import { LocaleType } from 'src/types/response';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        private readonly i18n: I18nService,
        private readonly logger: LoggerService,
        private readonly prisma: PrismaService,
        private readonly trans: TranslateService,
    ) {}
    private context: ContextType = 'profile';

    async update(
        phone: string,
        { nationalIdNumber, address, ...dto }: UpdateProfileDto,
        locale?: LocaleType,
    ) {
        const user = await this.prisma.user.findUnique({
            where: { phone },
            select: { id: true, profile: { select: { id: true } } },
        });

        const nationalIdIsExist = await this.prisma.nationalIdentity.findUnique({
            where: { nationalIdNumber },
        });
        if (nationalIdIsExist) throw new ConflictException('National Id Number is exist.');

        const emailExist = await this.prisma.profile.findUnique({ where: { email: dto?.email } });
        if (emailExist) throw new ConflictException('Email already exist.');

        if (!user?.profile) {
            return await RequestHandler({
                method: 'create',
                context: this.context,
                i18n: this.i18n,
                logger: this.logger,
                locale,
                fn: async () =>
                    await this.prisma.profile.create({
                        data: {
                            ...dto,
                            profileComplete: new Date(),
                            user: { connect: { id: user?.id } },
                            address: { create: { ...address } },
                            national: { create: { nationalIdNumber } },
                        },
                    }),
            });
        } else {
            return await RequestHandler({
                method: 'update',
                context: this.context,
                i18n: this.i18n,
                logger: this.logger,
                locale,
                id: user?.profile?.id,
                fn: async () =>
                    await this.prisma.profile.update({
                        where: { id: user?.profile?.id },
                        data: {
                            ...dto,
                            profileComplete: new Date(),
                            address: { create: { ...address } },
                            national: { create: { nationalIdNumber } },
                        },
                    }),
            });
        }
    }

    async uploadAll(
        id: string,
        {
            avatarFile,
            nationalFaceFile,
            nationalBackFile,
        }: {
            avatarFile?: Express.Multer.File;
            nationalFaceFile?: Express.Multer.File;
            nationalBackFile?: Express.Multer.File;
        },
        locale?: LocaleType,
    ) {
        const profile = await this.prisma.profile.findUnique({
            where: { id },
            select: {
                image: true,
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
        const role = profile?.user?.role;

        const oldImageUrl = profile?.image;
        const oldFaceUrl = profile?.national?.face;
        const oldBackUrl = profile?.national?.back;

        const folder = role.toLowerCase();

        return await RequestHandler({
            method: 'update',
            context: this.context,
            i18n: this.i18n,
            logger: this.logger,
            locale,
            id,
            fn: async () => {
                let image: string | null = null;
                let face: string | null = null;
                let back: string | null = null;

                if (avatarFile) {
                    const fileName = avatarFile.filename;
                    image = GenerateUploadUrl({ folder, fileName });

                    if (oldImageUrl && image !== oldImageUrl) {
                        await deleteFile({ url: oldImageUrl, folder });
                    }
                }

                if (nationalFaceFile) {
                    const fileName = nationalFaceFile.filename;
                    face = GenerateUploadUrl({
                        folder: `${folder}/national-identity/face`,
                        fileName,
                    });

                    if (oldFaceUrl && face !== oldFaceUrl) {
                        await deleteFile({
                            url: oldFaceUrl,
                            folder: `${folder}/national-identity/face`,
                        });
                    }
                }

                if (nationalBackFile) {
                    const fileName = nationalBackFile.filename;
                    back = GenerateUploadUrl({
                        folder: `${folder}/national-identity/back`,
                        fileName,
                    });

                    if (oldBackUrl && back !== oldBackUrl) {
                        await deleteFile({
                            url: oldBackUrl,
                            folder: `${folder}/national-identity/back`,
                        });
                    }
                }

                if (!image && !face && !back) return;

                return await this.prisma.profile.update({
                    where: { id },
                    data: {
                        ...(image && { image }),
                        ...(face || back
                            ? {
                                  national: {
                                      update: {
                                          ...(face && { face }),
                                          ...(back && { back }),
                                      },
                                  },
                              }
                            : {}),
                    },
                    include: {
                        national: true,
                    },
                });
            },
        });
    }
}
