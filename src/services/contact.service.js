import { supabase } from "@/lib/supabase";

// GET SINGLE CONTACT (1 ROW)
export async function getContact() {
  const { data, error } = await supabase
    .from("contact")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

// UPDATE CONTACT
export async function updateContact(payload) {
  const { data, error } = await supabase
    .from("contact")
    .update(payload)
    .eq("id", payload.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
