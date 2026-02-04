import { supabase } from "@/lib/supabase";

export async function getDashboardData() {
  const [profileRes, projectsRes, skillsRes, contactRes] =
    await Promise.all([
      supabase.from("profiles").select("*").single(),
      supabase.from("projects").select("id"),
      supabase.from("skills").select("id"),
      supabase.from("contact").select("*").single(),
    ]);

  if (profileRes.error) throw profileRes.error;
  if (projectsRes.error) throw projectsRes.error;
  if (skillsRes.error) throw skillsRes.error;
  if (contactRes.error) throw contactRes.error;

  return {
    profile: profileRes.data,
    totalProjects: projectsRes.data.length,
    totalSkills: skillsRes.data.length,
    contact: contactRes.data,
  };
}
