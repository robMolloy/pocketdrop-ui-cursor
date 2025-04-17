import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { pb } from "@/config/pocketbaseConfig";

interface FileUploaderProps {
    currentPath: string;
    onUploadComplete?: () => void;
}

export function FileUploader({ currentPath, onUploadComplete }: FileUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setIsUploading(true);
        try {
            for (const file of acceptedFiles) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("filePath", currentPath);

                await pb.collection("files").create(formData);
            }
            onUploadComplete?.();
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
        }
    }, [currentPath, onUploadComplete]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled: isUploading,
    });

    return (
        <div
            {...getRootProps()}
            className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25"
                } ${isUploading ? "opacity-50" : ""}`}
        >
            <input {...getInputProps()} />
            <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
            {isUploading ? (
                <p className="text-sm text-muted-foreground">Uploading...</p>
            ) : isDragActive ? (
                <p className="text-sm text-muted-foreground">Drop the files here...</p>
            ) : (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Drag and drop files here, or click to select files
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                        Select Files
                    </Button>
                </div>
            )}
        </div>
    );
} 