import { join } from 'path';
import { serverUrl } from 'src/config';

export type getUploadUrlPropsType = {
    folder: string;
    fileName: string;
};

export const GenerateUploadUrl = ({ folder, fileName }: getUploadUrlPropsType): string => {
    const url = join(serverUrl, folder, fileName);
    return url;
};
