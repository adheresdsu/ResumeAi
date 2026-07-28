import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { EducationList } from "@/components/career-profile/education-list";
import { SkillList } from "@/components/career-profile/skill-list";
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

  const { data: education, error: educationError } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", user.id)
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (educationError) {
    throw new Error(educationError.message);
  }

  const { data: profileSkills, error: skillsError } = await supabase
    .from("profile_skills")
    .select("id, verification_status, skills(id, name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (skillsError) {
    throw new Error(skillsError.message);
  }

  return (
    <div className="grid max-w-3xl gap-6">
      <Reveal>
        <h1 className="text-2xl font-semibold tracking-tight">Career Profile</h1>
        <p className="text-muted-foreground">
          Manage your work experience and education. This is the source of truth used to build
          resumes.
        </p>
      </Reveal>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Work experience</h2>
        <WorkExperienceList workExperiences={workExperiences ?? []} />
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Education</h2>
        <EducationList education={education ?? []} />
      </section>

      <section className="grid gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
        <SkillList skills={profileSkills ?? []} />
      </section>
    </div>
  );
}
