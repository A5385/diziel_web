import { AppConfig, serverUrl } from 'src/config';

export type getUploadUrlPropsType = {
    folder: string;
    fileName: string;
};

export const GenerateUploadUrl = ({ folder, fileName }: getUploadUrlPropsType): string => {
    // Correcting URL concatenation and removing unnecessary quotes
    const url = `${serverUrl}/${AppConfig.uploadFolder}/${folder}/${fileName}`;
    return url;
};
