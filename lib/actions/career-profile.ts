"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { CareerProfileActionState } from "@/lib/validations/career-profile";
import {
  workExperienceBulletSchema,
  workExperienceSchema,
} from "@/lib/validations/career-profile";

const CAREER_PROFILE_PATH = "/career-profile";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}

async function requireUserId(): Promise<
  { userId: string; supabase: Awaited<ReturnType<typeof createClient>> } | null
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return { userId: user.id, supabase };
}

async function verifyWorkExperienceOwnership(
  supabase: Awaited<ReturnType<typeof createClient>>,
  workExperienceId: string,
  userId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("work_experiences")
    .select("id")
    .eq("id", workExperienceId)
    .eq("user_id", userId)
    .maybeSingle();

  return Boolean(data);
}

async function getOwnedBulletWorkExperienceId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bulletId: string,
  userId: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("work_experience_bullets")
    .select("work_experience_id, work_experiences!inner(user_id)")
    .eq("id", bulletId)
    .eq("work_experiences.user_id", userId)
    .maybeSingle();

  return data?.work_experience_id ?? null;
}

function parseWorkExperienceFormData(formData: FormData) {
  return workExperienceSchema.safeParse({
    company: formData.get("company"),
    title: formData.get("title"),
    location: formData.get("location"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    isCurrent: formData.get("isCurrent") === "on",
    description: formData.get("description"),
    displayOrder: formData.get("displayOrder") ?? 0,
  });
}

export async function createWorkExperienceAction(
  _prevState: CareerProfileActionState,
  formData: FormData,
): Promise<CareerProfileActionState> {
  const parsed = parseWorkExperienceFormData(formData);

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const auth = await requireUserId();
  if (!auth) {
    return { status: "error", message: "You must be signed in." };
  }

  const { supabase, userId } = auth;
  const { error } = await supabase.from("work_experiences").insert({
    user_id: userId,
    company: parsed.data.company,
    title: parsed.data.title,
    location: parsed.data.location,
    start_date: parsed.data.startDate,
    end_date: parsed.data.endDate,
    is_current: parsed.data.isCurrent,
    description: parsed.data.description,
    display_order: parsed.data.displayOrder,
    verification_status: "user_confirmed",
  });

  if (error) {
    return { status: "error", message: getErrorMessage(error) };
  }

  revalidatePath(CAREER_PROFILE_PATH);
  return { status: "success", message: "Work experience added." };
}

export async function updateWorkExperienceAction(
  _prevState: CareerProfileActionState,
  formData: FormData,
): Promise<CareerProfileActionState> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { status: "error", message: "Missing work experience id." };
  }

  const parsed = parseWorkExperienceFormData(formData);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const auth = await requireUserId();
  if (!auth) {
    return { status: "error", message: "You must be signed in." };
  }

  const { supabase, userId } = auth;
  const { error } = await supabase
    .from("work_experiences")
    .update({
      company: parsed.data.company,
      title: parsed.data.title,
      location: parsed.data.location,
      start_date: parsed.data.startDate,
      end_date: parsed.data.endDate,
      is_current: parsed.data.isCurrent,
      description: parsed.data.description,
      display_order: parsed.data.displayOrder,
      verification_status: "user_edited",
    })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return { status: "error", message: getErrorMessage(error) };
  }

  revalidatePath(CAREER_PROFILE_PATH);
  return { status: "success", message: "Work experience updated." };
}

export async function deleteWorkExperienceAction(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    throw new Error("Missing work experience id.");
  }

  const auth = await requireUserId();
  if (!auth) {
    throw new Error("You must be signed in.");
  }

  const { supabase, userId } = auth;
  const { error } = await supabase
    .from("work_experiences")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw new Error(getErrorMessage(error));
  }

  revalidatePath(CAREER_PROFILE_PATH);
}

export async function createWorkExperienceBulletAction(
  _prevState: CareerProfileActionState,
  formData: FormData,
): Promise<CareerProfileActionState> {
  const workExperienceId = formData.get("workExperienceId");
  if (typeof workExperienceId !== "string" || !workExperienceId) {
    return { status: "error", message: "Missing work experience id." };
  }

  const parsed = workExperienceBulletSchema.safeParse({
    content: formData.get("content"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const auth = await requireUserId();
  if (!auth) {
    return { status: "error", message: "You must be signed in." };
  }

  const { supabase, userId } = auth;
  const owned = await verifyWorkExperienceOwnership(supabase, workExperienceId, userId);
  if (!owned) {
    return { status: "error", message: "Work experience not found." };
  }

  const { error } = await supabase.from("work_experience_bullets").insert({
    work_experience_id: workExperienceId,
    content: parsed.data.content,
    sort_order: parsed.data.sortOrder,
    verification_status: "user_confirmed",
  });

  if (error) {
    return { status: "error", message: getErrorMessage(error) };
  }

  revalidatePath(CAREER_PROFILE_PATH);
  return { status: "success", message: "Bullet added." };
}

export async function updateWorkExperienceBulletAction(
  _prevState: CareerProfileActionState,
  formData: FormData,
): Promise<CareerProfileActionState> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { status: "error", message: "Missing bullet id." };
  }

  const parsed = workExperienceBulletSchema.safeParse({
    content: formData.get("content"),
    sortOrder: formData.get("sortOrder") ?? 0,
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const auth = await requireUserId();
  if (!auth) {
    return { status: "error", message: "You must be signed in." };
  }

  const { supabase, userId } = auth;
  const ownedWorkExperienceId = await getOwnedBulletWorkExperienceId(supabase, id, userId);
  if (!ownedWorkExperienceId) {
    return { status: "error", message: "Bullet not found." };
  }

  const { error } = await supabase
    .from("work_experience_bullets")
    .update({
      content: parsed.data.content,
      verification_status: "user_edited",
    })
    .eq("id", id);

  if (error) {
    return { status: "error", message: getErrorMessage(error) };
  }

  revalidatePath(CAREER_PROFILE_PATH);
  return { status: "success", message: "Bullet updated." };
}

export async function deleteWorkExperienceBulletAction(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    throw new Error("Missing bullet id.");
  }

  const auth = await requireUserId();
  if (!auth) {
    throw new Error("You must be signed in.");
  }

  const { supabase, userId } = auth;
  const ownedWorkExperienceId = await getOwnedBulletWorkExperienceId(supabase, id, userId);
  if (!ownedWorkExperienceId) {
    throw new Error("Bullet not found.");
  }

  const { error } = await supabase.from("work_experience_bullets").delete().eq("id", id);

  if (error) {
    throw new Error(getErrorMessage(error));
  }

  revalidatePath(CAREER_PROFILE_PATH);
}

export async function moveWorkExperienceBulletAction(formData: FormData): Promise<void> {
  const id = formData.get("id");
  const workExperienceId = formData.get("workExperienceId");
  const direction = formData.get("direction");

  if (
    typeof id !== "string" ||
    !id ||
    typeof workExperienceId !== "string" ||
    !workExperienceId ||
    (direction !== "up" && direction !== "down")
  ) {
    throw new Error("Invalid reorder request.");
  }

  const auth = await requireUserId();
  if (!auth) {
    throw new Error("You must be signed in.");
  }

  const { supabase, userId } = auth;
  const owned = await verifyWorkExperienceOwnership(supabase, workExperienceId, userId);
  if (!owned) {
    throw new Error("Work experience not found.");
  }

  const { data: bullets, error: fetchError } = await supabase
    .from("work_experience_bullets")
    .select("id, sort_order")
    .eq("work_experience_id", workExperienceId)
    .order("sort_order", { ascending: true });

  if (fetchError) {
    throw new Error(getErrorMessage(fetchError));
  }

  const currentIndex = (bullets ?? []).findIndex((bullet) => bullet.id === id);
  if (currentIndex === -1) {
    throw new Error("Bullet not found.");
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= (bullets ?? []).length) {
    return;
  }

  const current = bullets![currentIndex];
  const target = bullets![targetIndex];

  const [{ error: firstError }, { error: secondError }] = await Promise.all([
    supabase
      .from("work_experience_bullets")
      .update({ sort_order: target.sort_order })
      .eq("id", current.id),
    supabase
      .from("work_experience_bullets")
      .update({ sort_order: current.sort_order })
      .eq("id", target.id),
  ]);

  if (firstError || secondError) {
    throw new Error(getErrorMessage(firstError ?? secondError));
  }

  revalidatePath(CAREER_PROFILE_PATH);
}
