import * as fs from 'fs';
import { join } from 'path';
import { AppConfig } from 'src/config';

type DeleteFilePropsType = {
    url: string;
    folder: string;
};
export const deleteFile = async ({ url, folder }: DeleteFilePropsType) => {
    if (url) {
        const symbol = /\\|\//;
        const fileName = url.split(symbol).pop() ?? '';

        const imagePath = join(process.cwd(), AppConfig.uploadFolder, folder, fileName);

        if (fs.existsSync(imagePath)) {
            await fs.promises.unlink(imagePath);
        }
    }
};
