import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "Set new password" };

export default function ResetPasswordPage() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Set a new password</h1>
        <p className="text-muted-foreground text-sm">
          Choose a new password for your account.
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
