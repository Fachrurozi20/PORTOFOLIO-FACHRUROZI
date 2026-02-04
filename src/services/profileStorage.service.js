import { supabase } from "@/lib/supabase";

const PHOTO_BUCKET = "profiles-files";
const CV_BUCKET = "cv";

// ---------- PHOTO ----------

export async function uploadProfilePhoto(file, oldPath) {
  if (oldPath) {
    await supabase.storage.from(PHOTO_BUCKET).remove([oldPath]);
  }

  const ext = file.name.split(".").pop();
  const path = `photo/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file);

  if (error) throw error;

  return path;
}

export function getPhotoUrl(path) {
  if (!path) return "";

  const { data } = supabase.storage
    .from(PHOTO_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

// ---------- CV ----------

export async function uploadCV(file, oldPath) {
  if (oldPath) {
    await supabase.storage.from(CV_BUCKET).remove([oldPath]);
  }

  const ext = file.name.split(".").pop();
  const path = `${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(CV_BUCKET)
    .upload(path, file);

  if (error) throw error;

  return path;
}

export function getCVUrl(path) {
  if (!path) return "";

  const { data } = supabase.storage
    .from(CV_BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function uploadAboutPhoto(file) {
  const ext = file.name.split(".").pop();
  const path = `about/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("profiles-files")
    .upload(path, file);

  if (error) throw error;

  return path;
}

export async function deleteAboutPhoto(path) {
  if (!path) return;

  const { error } = await supabase.storage
    .from("profiles-files")
    .remove([path]);

  if (error) throw error;
}
