import { supabase } from "@/lib/supabase";

const BUCKET = "skill-images";   // HARUS sama persis di Supabase
const FOLDER = "skills";

export async function uploadSkillImage(file) {
  const ext = file.name.split(".").pop();
  const path = `${FOLDER}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file);

  if (error) throw error;

  return path;
}

export async function deleteSkillImage(path) {
  if (!path) return;

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) throw error;
}

export function getPublicImageUrl(path) {
  if (!path) return "";

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}
