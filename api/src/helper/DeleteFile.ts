import * as fs from 'fs';
import { join } from 'path';

type DeleteFilePropsType = {
    url: string;
    folder: string;
};
export const deleteFile = async ({ url, folder }: DeleteFilePropsType) => {
    if (url) {
        const symbol = /\\|\//;
        const fileName = url.split(symbol).pop() ?? '';

        const imagePath = join(process.cwd(), 'upload', folder, fileName);

        if (fs.existsSync(imagePath)) {
            await fs.promises.unlink(imagePath);
        }
    }
};
