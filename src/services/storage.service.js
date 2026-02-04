import { supabase } from "@/lib/supabase";

const BUCKET = "project-images";
const PROJECT_FOLDER = "projects";
const SKILL_FOLDER = "skills";
const PROFILE_FOLDER = "profiles";
const CV_FOLDER = "cv";

/* ================================
   PROJECT IMAGES
================================ */

export async function uploadProjectImage(file) {
  const ext = file.name.split(".").pop();
  const filePath = `${PROJECT_FOLDER}/${Date.now()}-${Math.random()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}

export async function uploadMultipleProjectImages(files) {
  const paths = [];

  for (const file of files) {
    const ext = file.name.split(".").pop();
    const filePath = `${PROJECT_FOLDER}/${Date.now()}-${Math.random()}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file);

    if (error) throw error;

    paths.push(filePath);
  }

  return paths;
}

export async function deleteMultipleProjectImages(paths) {
  if (!paths.length) return;

  const { error } = await supabase
    .storage
    .from("project-images")
    .remove(paths);

  if (error) throw error;
}

/* ================================
   SKILL ICON
================================ */

export async function uploadSkillImage(file) {
  const ext = file.name.split(".").pop();
  const filePath = `${SKILL_FOLDER}/${Date.now()}-${Math.random()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}

/* ================================
   PROFILE PHOTOS
================================ */

export async function uploadProfilePhoto(file) {
  const ext = file.name.split(".").pop();
  const filePath = `${PROFILE_FOLDER}/${Date.now()}-${Math.random()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}

/* ================================
   CV FILE
================================ */

export async function uploadCV(file) {
  const ext = file.name.split(".").pop();
  const filePath = `${CV_FOLDER}/${Date.now()}-${Math.random()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}

/* ================================
   PUBLIC URL
================================ */

export function getPublicImageUrl(path) {
  if (!path) return "";

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);

  return data.publicUrl;
}
