"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/profile.service";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // LOAD PROFILE
  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error("LOAD PROFILE ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // UPDATE PROFILE
  async function saveProfile(payload) {
    if (!profile?.user_id) return;

    setSaving(true);

    try {
      const updated = await updateProfile(
        profile.user_id, // pakai user_id dari row supabase
        payload
      );

      setProfile(updated);
    } catch (err) {
      console.error("SAVE PROFILE ERROR:", err);
    } finally {
      setSaving(false);
    }
  }

  return {
    profile,
    loading,
    saving,
    saveProfile,
  };
}
