'use client';
import { LocaleType, useCustomTranslations } from '@/hooks/useCustomTranslations';
import { cn } from '@/lib/utils';
import { UploadIcon } from '@/styles/icons';
import { useLocale } from 'next-intl';
import Image from "next/legacy/image";
import React, { DetailedHTMLProps, useCallback, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import { Control, FieldValues, Path, useWatch } from 'react-hook-form';
import './cropper.css';

export type InputType = DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export type ShapeType = 'circle' | 'square-vertical' | 'square-horizontal';

export type AKUploadProps<T extends FieldValues> = InputType & {
    src?: string;
    inputStyle?: string;
    desc?: string;
    span?: number;
    divStyle?: string;
    label?: string;
    shape?: ShapeType;
    onChange?: (e: File | undefined) => void;
    control: Control<T>;
    name: Path<T>;
};

export const AKUploadFile = <T extends FieldValues>({
    onChange,
    shape = 'circle',
    src,
    control,
    name,

    ...props
}: AKUploadProps<T>) => {
    const l = useLocale();
    const cropperRef = useRef<ReactCropperElement>(null);
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const { getTranslate } = useCustomTranslations({
        locale: l as LocaleType,
        translations: {
            en: {
                dragNDrop: 'Drop the files here...',
                dragNDropNSelect: 'Drag and drop a file here, or click to select one',
                crop: 'Crop Image',
                skipCrop: 'Skip Cropping',
            },
            ar: {
                dragNDrop: 'اسحب الملف هنا ...',
                dragNDropNSelect: 'اسحب  القي الملف هنا او اضغط لاختيار ملف',
                crop: 'قص الصورة',
                skipCrop: 'الغاء القص',
            },
        },
    });

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles && acceptedFiles[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(acceptedFiles[0]);
                reader.onloadend = () => {
                    setImageFile(reader.result as string);
                    if (onChange) onChange(acceptedFiles[0]);
                };
            }
        },
        [onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const getCroppedImage = async () => {
        if (cropperRef.current && cropperRef.current.cropper) {
            const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
            const croppedDataUrl = croppedCanvas.toDataURL();
            setCroppedImage(croppedDataUrl);
            setImageFile(null);

            if (onChange) onChange(dataURLtoFile(croppedDataUrl, 'croppedImage.png'));
        }
    };

    const skipCropping = async () => {
        setCroppedImage(imageFile);
        setImageFile(null);

        if (onChange) onChange(dataURLtoFile(imageFile ?? '', 'image.png'));
    };

    const dataURLtoFile = (dataurl: string, filename: string) => {
        const arr = dataurl?.split(',') ?? [];
        const mime = arr[0]?.match(/:(.*?);/)?.[1] || '';
        const bstr = atob(arr[1] || '');
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const shapeStyle: Record<ShapeType, string> = {
        circle: 'aspect-square h-auto w-36 rounded-full',
        'square-horizontal': 'aspect-[5/3] w-36 h-auto rounded-lg',
        'square-vertical': 'aspect-[4/5] w-36 h-auto rounded-lg',
    };

    const avatarWatch = useWatch({
        control,
        name,
    });
    const imagePreview = avatarWatch ? URL.createObjectURL(avatarWatch) : src;

    return (
        <div className='flex w-full flex-col items-center'>
            {props?.label && <span className='mb-2 text-center'>{props.label}</span>}
            <div {...getRootProps()} className='flex w-full flex-col items-center'>
                <input {...getInputProps()} />
                <label
                    htmlFor={props.id}
                    className='flex w-full cursor-pointer flex-col items-center'
                >
                    <div
                        className={cn(
                            shapeStyle[shape],
                            isDragActive ? 'border-sec' : 'border-gray-300',
                            'relative flex items-center justify-center overflow-hidden border-2 border-dashed',
                            'transition-all duration-300 ease-in-out',
                        )}
                    >
                        {croppedImage ? (
                            <Image
                                src={croppedImage}
                                layout='fill'
                                className='object-contain'
                                alt='cropped'
                            />
                        ) : imagePreview ? (
                            <Image
                                src={imagePreview}
                                layout='fill'
                                className='object-contain'
                                alt='image'
                            />
                        ) : (
                            <UploadIcon size={40} />
                        )}
                    </div>
                </label>
                {isDragActive ? (
                    <p className='text-center text-sm text-blue-500'>{getTranslate('dragNDrop')}</p>
                ) : (
                    <p className='text-center text-sm text-gray-500'>
                        {getTranslate('dragNDropNSelect')}
                    </p>
                )}
            </div>
            {imageFile && (
                <div className='fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/75 p-4'>
                    <div className='relative w-full max-w-lg rounded-lg bg-white p-4 shadow-lg'>
                        <Cropper
                            ref={cropperRef}
                            src={imageFile}
                            style={{ height: 400, width: '100%' }}
                            initialAspectRatio={1}
                            guides={true}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                        />
                        <div className='mt-4 flex justify-end gap-2'>
                            <button
                                type='button'
                                onClick={getCroppedImage}
                                className='rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition-all duration-300 hover:bg-blue-600'
                            >
                                {getTranslate('crop')}
                            </button>
                            <button
                                type='button'
                                onClick={skipCropping}
                                className='rounded-lg bg-gray-500 px-4 py-2 text-white shadow-md transition-all duration-300 hover:bg-gray-600'
                            >
                                {getTranslate('skipCrop')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
