import { supabase } from "@/lib/supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      images: project_images (*)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createProject(payload) {
  const { data, error } = await supabase
    .from("projects")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateProject(id, payload) {
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
