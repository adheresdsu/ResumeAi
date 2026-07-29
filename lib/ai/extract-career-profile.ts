import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import {
  careerProfileExtractionSchema,
  type CareerProfileExtraction,
} from "@/lib/ai/career-profile-schema";

export const MAX_EXTRACTION_INPUT_LENGTH = 40_000;

const REQUEST_TIMEOUT_MS = 60_000;
const MAX_OUTPUT_TOKENS = 4096;
const EXTRACTION_TOOL_NAME = "record_career_profile_extraction";

export class CareerProfileExtractionError extends Error {}

export interface CareerProfileExtractionResult {
  suggestions: CareerProfileExtraction;
  model: string;
  inputTokens: number;
  outputTokens: number;
}

const SYSTEM_PROMPT = `You extract career profile facts from resume or CV text so a human can review them before anything is saved.

Rules you must follow exactly:
- Use only facts explicitly stated in the supplied text.
- Never invent employers, job titles, dates, degrees, skills, metrics, technologies or achievements.
- Do not improve, rewrite, embellish or summarize claims — describe only what the text supports.
- If a fact is uncertain, ambiguous, or only implied, omit that entire entry rather than guessing.
- Preserve the source wording for names, titles and bullet content where practical instead of paraphrasing.
- Call the ${EXTRACTION_TOOL_NAME} tool exactly once with your findings. If nothing can be confidently extracted, call it with empty arrays.`;

const EXTRACTION_TOOL_SCHEMA: Anthropic.Tool = {
  name: EXTRACTION_TOOL_NAME,
  description:
    "Record structured career profile facts extracted from resume text. Omit any work experience, education, skill or project entry that is not clearly supported by the text.",
  input_schema: {
    type: "object",
    properties: {
      workExperiences: {
        type: "array",
        items: {
          type: "object",
          properties: {
            company: { type: ["string", "null"] },
            title: { type: ["string", "null"] },
            location: { type: ["string", "null"] },
            startDate: { type: ["string", "null"] },
            endDate: { type: ["string", "null"] },
            isCurrent: { type: ["boolean", "null"] },
            bullets: { type: "array", items: { type: "string" } },
          },
          required: [
            "company",
            "title",
            "location",
            "startDate",
            "endDate",
            "isCurrent",
            "bullets",
          ],
        },
      },
      education: {
        type: "array",
        items: {
          type: "object",
          properties: {
            institution: { type: ["string", "null"] },
            degree: { type: ["string", "null"] },
            fieldOfStudy: { type: ["string", "null"] },
            startDate: { type: ["string", "null"] },
            endDate: { type: ["string", "null"] },
          },
          required: ["institution", "degree", "fieldOfStudy", "startDate", "endDate"],
        },
      },
      skills: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: ["string", "null"] },
          },
          required: ["name"],
        },
      },
      projects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: ["string", "null"] },
            description: { type: ["string", "null"] },
            url: { type: ["string", "null"] },
            startDate: { type: ["string", "null"] },
            endDate: { type: ["string", "null"] },
            bullets: { type: "array", items: { type: "string" } },
          },
          required: ["name", "description", "url", "startDate", "endDate", "bullets"],
        },
      },
    },
    required: ["workExperiences", "education", "skills", "projects"],
  },
};

function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new CareerProfileExtractionError("AI extraction is not configured.");
  }
  return new Anthropic({ apiKey });
}

function getModel(): string {
  const model = process.env.ANTHROPIC_MODEL;
  if (!model) {
    throw new CareerProfileExtractionError("AI extraction is not configured.");
  }
  return model;
}

function findToolUseBlock(content: Anthropic.ContentBlock[]): Anthropic.ToolUseBlock | undefined {
  return content.find(
    (block): block is Anthropic.ToolUseBlock =>
      block.type === "tool_use" && block.name === EXTRACTION_TOOL_NAME,
  );
}

export async function extractCareerProfile(
  extractedText: string,
): Promise<CareerProfileExtractionResult> {
  const trimmedText = extractedText.trim();

  if (!trimmedText) {
    throw new CareerProfileExtractionError("There is no extracted text to analyze.");
  }

  if (trimmedText.length > MAX_EXTRACTION_INPUT_LENGTH) {
    throw new CareerProfileExtractionError(
      "This file's extracted text is too long for AI extraction.",
    );
  }

  const client = getAnthropicClient();
  const model = getModel();

  let response: Anthropic.Message;

  try {
    response = await client.messages.create(
      {
        model,
        max_tokens: MAX_OUTPUT_TOKENS,
        system: SYSTEM_PROMPT,
        tools: [EXTRACTION_TOOL_SCHEMA],
        tool_choice: { type: "tool", name: EXTRACTION_TOOL_NAME },
        messages: [
          {
            role: "user",
            content: `Resume text:\n\n${trimmedText}`,
          },
        ],
      },
      { timeout: REQUEST_TIMEOUT_MS },
    );
  } catch {
    throw new CareerProfileExtractionError("AI extraction failed. Please try again later.");
  }

  const toolUse = findToolUseBlock(response.content);
  if (!toolUse) {
    throw new CareerProfileExtractionError("AI extraction did not return structured data.");
  }

  const parsed = careerProfileExtractionSchema.safeParse(toolUse.input);
  if (!parsed.success) {
    throw new CareerProfileExtractionError(
      "AI extraction returned data in an unexpected format.",
    );
  }

  return {
    suggestions: parsed.data,
    model,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  };
}
