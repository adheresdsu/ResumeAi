import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AuthActionState } from "@/lib/actions/auth-state";

export function AuthAlert({ state }: { state: AuthActionState }) {
  if (state.status === "idle" || !state.message) return null;

  const isError = state.status === "error";

  return (
    <Alert variant={isError ? "destructive" : "default"}>
      {isError ? <AlertCircle className="size-4" /> : <CheckCircle2 className="size-4" />}
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
}
