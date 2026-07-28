import { z } from "zod";

const optionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null));

const dateString = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date.");

export const workExperienceSchema = z
  .object({
    company: z.string().trim().min(1, "Enter a company name."),
    title: z.string().trim().min(1, "Enter a job title."),
    location: optionalTrimmedString,
    startDate: dateString,
    endDate: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? value : null))
      .refine(
        (value) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value),
        "Enter a valid end date.",
      ),
    isCurrent: z.boolean(),
    description: optionalTrimmedString,
    displayOrder: z.coerce.number().int().min(0).default(0),
  })
  .transform((data) => ({
    ...data,
    endDate: data.isCurrent ? null : data.endDate,
  }))
  .refine(
    (data) => data.endDate === null || data.endDate >= data.startDate,
    { message: "End date cannot be before start date.", path: ["endDate"] },
  );

export type WorkExperienceInput = z.infer<typeof workExperienceSchema>;

export const educationSchema = z
  .object({
    institution: z.string().trim().min(1, "Enter an institution name."),
    degree: optionalTrimmedString,
    fieldOfStudy: optionalTrimmedString,
    location: optionalTrimmedString,
    startDate: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? value : null))
      .refine(
        (value) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value),
        "Enter a valid start date.",
      ),
    endDate: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? value : null))
      .refine(
        (value) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value),
        "Enter a valid end date.",
      ),
    isCurrent: z.boolean(),
    description: optionalTrimmedString,
    displayOrder: z.coerce.number().int().min(0).default(0),
  })
  .transform((data) => ({
    ...data,
    endDate: data.isCurrent ? null : data.endDate,
  }))
  .refine(
    (data) =>
      data.startDate === null || data.endDate === null || data.endDate >= data.startDate,
    { message: "End date cannot be before start date.", path: ["endDate"] },
  );

export type EducationInput = z.infer<typeof educationSchema>;

export const workExperienceBulletSchema = z.object({
  content: z.string().trim().min(1, "Bullet content cannot be empty."),
  sortOrder: z.coerce.number().int().min(0).default(0),
});

export type WorkExperienceBulletInput = z.infer<typeof workExperienceBulletSchema>;

const SKILL_NAME_MAX_LENGTH = 100;

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter a skill name.")
    .max(SKILL_NAME_MAX_LENGTH, `Skill name must be ${SKILL_NAME_MAX_LENGTH} characters or fewer.`),
});

export type SkillInput = z.infer<typeof skillSchema>;

export interface CareerProfileActionState {
  status: "idle" | "error" | "success";
  message: string | null;
}

export const initialCareerProfileActionState: CareerProfileActionState = {
  status: "idle",
  message: null,
};
