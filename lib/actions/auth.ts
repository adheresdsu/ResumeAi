"use server";

import { redirect } from "next/navigation";

import type { AuthActionState } from "@/lib/actions/auth-state";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/validations/auth";

function getSupabaseConfigErrorMessage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return "Missing Supabase configuration. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart the server.";
  }

  try {
    new URL(supabaseUrl);
  } catch {
    return "NEXT_PUBLIC_SUPABASE_URL is invalid. Use the full Supabase project URL from your Supabase API settings.";
  }

  return null;
}

function getAuthErrorMessage(error: unknown) {
  const fallback = "Authentication failed. Please try again.";
  const rawMessage =
    typeof error === "string"
      ? error
      : error &&
          typeof error === "object" &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : fallback;

  const normalized = rawMessage.toLowerCase();

  if (normalized.includes("fetch failed") || normalized.includes("failed to fetch")) {
    return "Could not reach Supabase. Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, and confirm your Supabase project is active.";
  }

  if (normalized.includes("supabaseurl is required") || normalized.includes("supabasekey is required")) {
    return "Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart the server.";
  }

  return rawMessage;
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const configError = getSupabaseConfigErrorMessage();
  if (configError) {
    return { status: "error", message: configError };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error) {
      return { status: "error", message: getAuthErrorMessage(error) };
    }
  } catch (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  const redirectTo = formData.get("redirectTo");
  redirect(typeof redirectTo === "string" && redirectTo ? redirectTo : "/dashboard");
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const configError = getSupabaseConfigErrorMessage();
  if (configError) {
    return { status: "error", message: configError };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: { full_name: parsed.data.fullName },
        emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      },
    });

    if (error) {
      return { status: "error", message: getAuthErrorMessage(error) };
    }

    if (data.session) {
      redirect("/dashboard");
    }
  } catch (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  return {
    status: "success",
    message: "Check your inbox to confirm your email before signing in.",
  };
}

export async function forgotPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const configError = getSupabaseConfigErrorMessage();
  if (configError) {
    return { status: "error", message: configError };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${getSiteUrl()}/auth/callback?next=/reset-password`,
    });

    if (error) {
      return { status: "error", message: getAuthErrorMessage(error) };
    }
  } catch (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  // Always return a generic message so we don't reveal whether an account exists.
  return {
    status: "success",
    message: "If an account exists for that email, we sent a password reset link.",
  };
}

export async function resetPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  const configError = getSupabaseConfigErrorMessage();
  if (configError) {
    return { status: "error", message: configError };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

    if (error) {
      return { status: "error", message: getAuthErrorMessage(error) };
    }
  } catch (error) {
    return { status: "error", message: getAuthErrorMessage(error) };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
