export interface AuthActionState {
  status: "idle" | "error" | "success";
  message: string | null;
}

export const initialAuthState: AuthActionState = { status: "idle", message: null };
