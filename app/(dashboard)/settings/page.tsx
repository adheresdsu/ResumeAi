import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("user_id", user!.id)
    .maybeSingle();

  return (
    <div className="grid max-w-2xl gap-6">
      <Reveal>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account.</p>
      </Reveal>

      <StaggerGroup className="grid gap-6">
        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your basic account information.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-muted-foreground">Name</span>
                <span>{profile?.full_name ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{user?.email}</span>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Billing
                <Badge variant="secondary">{subscription?.plan ?? "free"} plan</Badge>
              </CardTitle>
              <CardDescription>
                Subscription management via Stripe is coming in a later phase.
              </CardDescription>
            </CardHeader>
          </Card>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}
