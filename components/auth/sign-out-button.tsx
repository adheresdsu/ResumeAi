import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button variant="ghost" size="sm" type="submit" className="w-full justify-start">
        <LogOut className="size-4" />
        Sign out
      </Button>
    </form>
  );
}
