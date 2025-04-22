/* eslint-disable no-unused-vars */
'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Control, Path, useFormContext, useWatch } from 'react-hook-form';
import { DeleteIcon, UploadIcon } from '../../styles/icons';

export type AKAttachmentProps = {
    title?: string;
    name: Path<any>;
    attachmentData?: { id?: string; url?: string }[];
    inputStyle?: string;
    control: Control<any>;
    onChange?: (files: File[]) => void;
    deleteAttachment: (id: string) => void;
};

export const AKUploadAttachments: React.FC<AKAttachmentProps> = ({
    control,
    title,
    name,
    attachmentData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inputStyle,
    deleteAttachment,
    onChange,
}) => {
    const g = useTranslations();
    const l = useLocale();
    const { setValue } = useFormContext(); // To interact with form state

    // Watch the current value of the attachment field from react-hook-form
    const attachments: File[] = useWatch({ control, name });

    // Default title if not passed
    if (!title) title = g('upload-attach');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            const allFiles = [...(attachments ?? []), ...newFiles]; // Include any pre-existing files
            if (onChange) {
                onChange(allFiles); // Update the state with new files
                setValue(name, allFiles); // Update the form state
            }
        } else {
            console.error('No files selected.');
        }
    };

    const deleteButtonStyle =
        'text-red-500 absolute -top-2 -left-2 bg-white rounded-full p-1 flex justify-center items-center border hover:bg-red-500 hover:text-white duration-300';

    const attachDiv = 'flex gap-3  flex-wrap items-start mt-4';
    const linkStyle = 'flex gap-2 flex-col text-[8px] items-center';
    const divImageStyle = 'relative w-8 h-8 aspect-square rounded-lg hover:scale-150 duration-500';
    const innerAttachDiv = 'flex items-center gap-2 border rounded-lg p-4 relative';

    return (
        <div>
            <label className='text mb-2 px-2 text-[.7rem] font-[500]'>{title}</label>
            <label
                htmlFor={name}
                className='flex min-h-[42px] cursor-pointer items-center gap-3 rounded-lg border border-dashed px-3 py-1.5 hover:bg-gray-50'
            >
                <input
                    type='file'
                    id={name}
                    name={name}
                    className='hidden'
                    multiple
                    onChange={handleFileChange}
                />
                <UploadIcon />
                {title}
            </label>
            {attachments && attachments.length > 0 && (
                <div className='relative mt-5 flex flex-col justify-start gap-2 rounded-lg border p-4'>
                    <div className={attachDiv}>
                        {attachments?.map((file, index) => (
                            <div key={index} className={innerAttachDiv}>
                                <Link
                                    href={URL.createObjectURL(file) ?? ''}
                                    target='_blank'
                                    key={index}
                                    className={linkStyle}
                                >
                                    <div className={divImageStyle}>
                                        <Image
                                            src={getFileImage(file)}
                                            alt=''
                                            fill
                                            sizes='w-full'
                                            className='object-contain'
                                        />
                                    </div>
                                    {getName(file.name)}
                                </Link>
                                <button
                                    className={deleteButtonStyle}
                                    onClick={() => {
                                        const updatedAttachments = attachments.filter(
                                            (_, i) => i !== index,
                                        );
                                        if (onChange) onChange(updatedAttachments);
                                        setValue(name, updatedAttachments); // Update form state on delete
                                    }}
                                    type='button'
                                >
                                    <DeleteIcon size={10} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {attachmentData && attachmentData.length > 0 && (
                <div className='relative mt-5 flex flex-col justify-start gap-2 rounded-lg border p-4'>
                    <h6>{l == 'en' ? 'Recent Attachments' : 'المرفقات الحالية'}</h6>
                    <div className={attachDiv}>
                        {attachmentData.map((file, index) => (
                            <div key={index} className={innerAttachDiv}>
                                <Link
                                    href={file?.url ?? ''}
                                    target='_blank'
                                    key={index}
                                    className={linkStyle}
                                >
                                    <div className={divImageStyle}>
                                        <Image
                                            src={getImage(file?.url ?? '')}
                                            alt=''
                                            fill
                                            sizes='w-full'
                                            className='object-contain'
                                        />
                                    </div>
                                    {getUrlName(file?.url ?? '')}
                                </Link>
                                <button
                                    className={deleteButtonStyle}
                                    onClick={() => deleteAttachment(file?.id ?? '')}
                                    type='button'
                                >
                                    <DeleteIcon size={15} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const getImage = (url: string) => {
    const image = url?.endsWith('.pdf')
        ? '/images/pdf.png'
        : url.endsWith('.txt')
          ? '/images/txt.png'
          : url.endsWith('docx')
            ? '/images/docx.png'
            : url;
    return image;
};

const getFileImage = (file: File) => {
    const fileNameParts = file.name.split('.');
    const lastPartPosition = fileNameParts ? fileNameParts.length : 0;
    const lastParts = fileNameParts ? fileNameParts[lastPartPosition - 1] : '';

    const fileExtension = lastParts?.toLowerCase();

    switch (fileExtension) {
        case 'pdf':
            return '/images/pdf.png';
        case 'txt':
            return '/images/txt.png';
        case 'docx':
            return '/images/docx.png';
        default:
            return URL.createObjectURL(file);
    }
};

const getName = (name: string) => {
    const fileNameParts = name.split('.');
    const lastPartPosition = fileNameParts ? fileNameParts.length : 0;
    const lastParts = fileNameParts ? fileNameParts[lastPartPosition - 1] : '';

    return name.length > 10 ? name.slice(0, 7) + '...' + lastParts : name;
};

const getUrlName = (url: string) => {
    const urlName = url.length > 10 ? url.slice(-10) : url;
    return urlName;
};
