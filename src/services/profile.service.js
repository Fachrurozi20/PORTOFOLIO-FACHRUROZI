import { supabase } from "@/lib/supabase";

// ambil 1 data profile (portfolio personal)
export async function getProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

// update profile berdasarkan user_id
export async function updateProfile(userId, payload) {
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("user_id", userId)   // 🔑 wajib pakai ini
    .select()
    .single();

  if (error) throw error;
  return data;
}
