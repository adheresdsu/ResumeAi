import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { WorkExperienceList } from "@/components/career-profile/work-experience-list";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Career Profile" };

export default async function CareerProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: workExperiences, error } = await supabase
    .from("work_experiences")
    .select("*, work_experience_bullets(*)")
    .eq("user_id", user.id)
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="grid max-w-3xl gap-6">
      <Reveal>
        <h1 className="text-2xl font-semibold tracking-tight">Career Profile</h1>
        <p className="text-muted-foreground">
          Manage your work experience. This is the source of truth used to build resumes.
        </p>
      </Reveal>

      <WorkExperienceList workExperiences={workExperiences ?? []} />
    </div>
  );
}
