import { supabase } from "@/lib/supabase";

export async function addProjectImages(projectId, paths) {
  const payload = paths.map((p) => ({
    project_id: projectId,
    image_path: p,
  }));

  const { error } = await supabase
    .from("project_images")
    .insert(payload);

  if (error) throw error;
}

export async function getProjectImages(projectId) {
  const { data, error } = await supabase
    .from("project_images")
    .select("*")
    .eq("project_id", projectId);

  if (error) throw error;
  return data;
}

export async function deleteProjectImages(projectId) {
  const { data, error } = await supabase
    .from("project_images")
    .select("image_path")
    .eq("project_id", projectId);

  if (error) throw error;

  return data;
}
