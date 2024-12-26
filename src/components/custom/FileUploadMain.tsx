import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FiPlus } from "react-icons/fi";


interface CustomFile {
    fileName: string;
    filePath: string;
    type: string;
}

interface FileUploadProps {
    onFileUpload: (files: CustomFile[]) => void;
    uploadFunction: (formData: FormData, tokenData?: string) => Promise<any>;
    downloadFunction?: (file: CustomFile, tokenData?: string) => Promise<Blob>;
    multiple?: boolean;
    showImage?: boolean;
    accept?: string;
    tokenData?: string;
    existingFiles?: CustomFile[];
}

function FileUploadMain({
    onFileUpload,
    uploadFunction,
    downloadFunction,
    multiple = false,
    accept = '',
    tokenData,
    existingFiles = [],
}: FileUploadProps) {

    const [uploadedFiles, setUploadedFiles] = useState<CustomFile[]>(existingFiles);
    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
        setUploadedFiles(existingFiles);
    }, [existingFiles]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const filesArray = Array.from(files);
        const newUploadedFiles: CustomFile[] = [];

        for (const file of filesArray) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await uploadFunction(formData, tokenData);

                // const validFilePath = `${process.env.NEXT_PUBLIC_API_URL}/ImportFiles/${response.filePath.replace(/\\/g, "/")}`;
                newUploadedFiles.push({ fileName: response.fileName, filePath: response.filePath, type: response.type });

            } catch (error) {
                console.error('Upload failed:', error);
                setUploadError('Upload failed. Please try again.');
            }
        }
        const allFiles = [...uploadedFiles, ...newUploadedFiles];
        setUploadedFiles(allFiles);

        onFileUpload(allFiles);
        event.target.value = '';
    };

    const deleteAttachment = (file: CustomFile) => {
        const newFiles = uploadedFiles.filter(f => f != file);
        setUploadedFiles(newFiles);
        onFileUpload(newFiles);
    };

    const downloadFile = async (file: CustomFile) => {
        if (!downloadFunction) {
            console.error('Download function is not defined');
            setUploadError('Download function is not available.');
            return;
        }

        try {
            const response = await downloadFunction(file);

            const blob = new Blob([response]);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = file.fileName;
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download failed:', error);
            setUploadError('Download failed. Please try again.');
        }
    };

    return (
        <div className="file-attachments">
            <ul>
                {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {uploadedFiles.map((file) => (
                            <li key={file.filePath} className="relative flex flex-col items-center cursor-pointer">
                                <div className="relative flex flex-col items-center justify-center rounded pb-2 w-full max-w-[450px]">
                                    <div
                                        className="rounded border border-gray-500 p-2 w-full text-center"
                                        onClick={() => downloadFile(file)}
                                    >
                                        <span className="text-xs font-medium">{file.fileName}</span>
                                    </div>
                                    <div
                                        onClick={() => deleteAttachment(file)}
                                        className="absolute -top-2 -right-4 text-black flex items-center justify-center h-8 w-8"
                                    >
                                        <RiDeleteBin6Fill className="h-4 w-4 text-black" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                )}
            </ul>


            <label className="p-3 flex justify-center items-center text-center border border-green-700 rounded cursor-pointer bg-gray-100">
                <span>
                    <FiPlus className=' h-6 w-6 text-green-700' />
                </span>
                <Input
                    type="file"
                    accept={accept}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple={multiple}
                />
            </label>

        </div>
    );
};

export default FileUploadMain;
