import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { UserRole } from '@prisma/client';
import * as fs from 'fs';
import * as multer from 'multer';
import { extname } from 'path';
import { AppConfig } from 'src/config';

type ValidateFilePropsType = {
    file;
    type: 'image' | 'file';
};

export const ValidateFile = ({ file, type }: ValidateFilePropsType): boolean => {
    const imagePattern = /\.(jpg|jpeg|png|gif|webp)$/;
    const docPattern = /\.(docx|pdf|txt|jpg|jpeg|png|gif|webp)$/;

    const isMatch = Boolean(file.originalname.match(type === 'image' ? imagePattern : docPattern));

    return isMatch;
};

export type MulterOptionPropsType = {
    type: 'image' | 'file';
    folder?: string;
};

export interface RequestUser {
    sub: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}

export type GenerateFileNamePropsType = {
    file: Express.Multer.File;
};
export const GenerateFileName = ({ file }: GenerateFileNamePropsType): string => {
    // console.log('generate file name ', file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file?.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    // console.log('generate file name ', filename);

    return filename;
};

export const GenerateMulterOption = ({ type, folder }: MulterOptionPropsType): MulterOptions => {
    const options: MulterOptions = {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const url = `${AppConfig.uploadFolder}/${folder && folder}`;

                if (!fs.existsSync(url)) {
                    fs.mkdirSync(url, { recursive: true });
                }

                cb(null, url);
            },
            filename: (req, file, cb) => {
                const filename = GenerateFileName({ file });
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            return ValidateFile({ file, type }) ? callback(null, true) : callback(null, false);
        },
    };
    return options;
};
