import "server-only";

import type { UploadedFileType } from "@/lib/validations/uploaded-file";

export const MAX_EXTRACTED_TEXT_LENGTH = 200_000;

export class TextExtractionError extends Error {}

function normalizeExtractedText(rawText: string): string {
  return rawText
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function extractTxt(buffer: Buffer): Promise<string> {
  return buffer.toString("utf-8");
}

async function extractDocx(buffer: Buffer): Promise<string> {
  const { default: mammoth } = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function extractPdf(buffer: Buffer): Promise<string> {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.text;
  } finally {
    await parser.destroy();
  }
}

export async function extractTextFromFile(
  fileType: UploadedFileType,
  buffer: Buffer,
): Promise<string> {
  if (fileType === "txt") {
    const rawText = await extractTxt(buffer);
    const normalized = normalizeExtractedText(rawText);

    if (!normalized) {
      throw new TextExtractionError("This text file is empty.");
    }

    return normalized.slice(0, MAX_EXTRACTED_TEXT_LENGTH);
  }

  if (fileType === "docx") {
    let rawText: string;

    try {
      rawText = await extractDocx(buffer);
    } catch {
      throw new TextExtractionError("This DOCX file could not be read. It may be corrupted or unsupported.");
    }

    const normalized = normalizeExtractedText(rawText);

    if (!normalized) {
      throw new TextExtractionError("No readable text was found in this DOCX file.");
    }

    return normalized.slice(0, MAX_EXTRACTED_TEXT_LENGTH);
  }

  let rawText: string;

  try {
    rawText = await extractPdf(buffer);
  } catch {
    throw new TextExtractionError("This PDF could not be read. It may be corrupted or password-protected.");
  }

  const normalized = normalizeExtractedText(rawText);

  if (!normalized) {
    throw new TextExtractionError(
      "No selectable text was found. This may be a scanned or image-only PDF. OCR is not supported yet.",
    );
  }

  return normalized.slice(0, MAX_EXTRACTED_TEXT_LENGTH);
}
