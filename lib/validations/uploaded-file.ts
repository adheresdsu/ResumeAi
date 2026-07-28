export const UPLOADED_FILE_MAX_SIZE_BYTES = 10 * 1024 * 1024;

export type UploadedFileType = "pdf" | "docx" | "txt";

const ALLOWED_FILE_TYPES: Record<UploadedFileType, { extension: string; mimeTypes: string[] }> = {
  pdf: { extension: ".pdf", mimeTypes: ["application/pdf"] },
  docx: {
    extension: ".docx",
    mimeTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  txt: { extension: ".txt", mimeTypes: ["text/plain"] },
};

export type UploadedFileValidationResult =
  | { success: true; fileType: UploadedFileType }
  | { success: false; message: string };

export function validateUploadedFile(file: File): UploadedFileValidationResult {
  if (!file || file.size === 0) {
    return { success: false, message: "Select a file to upload." };
  }

  if (file.size > UPLOADED_FILE_MAX_SIZE_BYTES) {
    return { success: false, message: "File must be 10 MB or smaller." };
  }

  const lowerCaseName = file.name.toLowerCase();
  const matchedType = (Object.keys(ALLOWED_FILE_TYPES) as UploadedFileType[]).find((fileType) => {
    const config = ALLOWED_FILE_TYPES[fileType];
    return lowerCaseName.endsWith(config.extension) && config.mimeTypes.includes(file.type);
  });

  if (!matchedType) {
    return {
      success: false,
      message: "Only PDF, DOCX and TXT files are allowed.",
    };
  }

  return { success: true, fileType: matchedType };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
