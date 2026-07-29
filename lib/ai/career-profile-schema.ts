import { z } from "zod";

const nullableTrimmedString = z.string().trim().min(1).nullable();

export const extractedWorkExperienceSchema = z.object({
  company: nullableTrimmedString,
  title: nullableTrimmedString,
  location: nullableTrimmedString,
  startDate: nullableTrimmedString,
  endDate: nullableTrimmedString,
  isCurrent: z.boolean().nullable(),
  bullets: z.array(z.string().trim().min(1)),
});

export type ExtractedWorkExperience = z.infer<typeof extractedWorkExperienceSchema>;

export const extractedEducationSchema = z.object({
  institution: nullableTrimmedString,
  degree: nullableTrimmedString,
  fieldOfStudy: nullableTrimmedString,
  startDate: nullableTrimmedString,
  endDate: nullableTrimmedString,
});

export type ExtractedEducation = z.infer<typeof extractedEducationSchema>;

export const extractedSkillSchema = z.object({
  name: nullableTrimmedString,
});

export type ExtractedSkill = z.infer<typeof extractedSkillSchema>;

export const extractedProjectSchema = z.object({
  name: nullableTrimmedString,
  description: nullableTrimmedString,
  url: nullableTrimmedString,
  startDate: nullableTrimmedString,
  endDate: nullableTrimmedString,
  bullets: z.array(z.string().trim().min(1)),
});

export type ExtractedProject = z.infer<typeof extractedProjectSchema>;

export const careerProfileExtractionSchema = z.object({
  workExperiences: z.array(extractedWorkExperienceSchema),
  education: z.array(extractedEducationSchema),
  skills: z.array(extractedSkillSchema),
  projects: z.array(extractedProjectSchema),
});

export type CareerProfileExtraction = z.infer<typeof careerProfileExtractionSchema>;

export const EMPTY_CAREER_PROFILE_EXTRACTION: CareerProfileExtraction = {
  workExperiences: [],
  education: [],
  skills: [],
  projects: [],
};

export function countCareerProfileExtractionItems(suggestions: CareerProfileExtraction): {
  workExperiences: number;
  education: number;
  skills: number;
  projects: number;
} {
  return {
    workExperiences: suggestions.workExperiences.length,
    education: suggestions.education.length,
    skills: suggestions.skills.length,
    projects: suggestions.projects.length,
  };
}
