import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Create account" };

export default function SignUpPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground text-sm">
          Build an ATS-friendly resume in minutes.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
