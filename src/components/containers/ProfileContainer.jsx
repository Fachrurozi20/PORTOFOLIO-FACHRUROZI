"use client";

import { useState } from "react";
import ProfileForm from "@/components/sections/ProfileForm";
import { useProfile } from "@/hooks/useProfile";

import {
  uploadProfilePhoto,
  uploadAboutPhoto,
  deleteAboutPhoto,
  uploadCV,
} from "@/services/profileStorage.service";

export default function ProfileContainer() {
  const { profile, loading, saving, saveProfile } = useProfile();

  const [heroFile, setHeroFile] = useState(null);
  const [aboutFile, setAboutFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  async function handleUpdate(form) {
    let heroPath = profile.photo_path;
    let aboutPath = profile.about_photo_path;
    let cvPath = profile.cv_path;

    /* ===== HERO PHOTO ===== */
    if (heroFile) {
      heroPath = await uploadProfilePhoto(
        heroFile,
        profile.photo_path
      );
    }

    /* ===== ABOUT PHOTO ===== */
    if (aboutFile) {
      await deleteAboutPhoto(profile.about_photo_path);

      aboutPath = await uploadAboutPhoto(aboutFile);
    }

    /* ===== CV FILE ===== */
    if (cvFile) {
      cvPath = await uploadCV(
        cvFile,
        profile.cv_path
      );
    }

    await saveProfile({
      ...form,
      photo_path: heroPath,
      about_photo_path: aboutPath,
      cv_path: cvPath,
    });

    setHeroFile(null);
    setAboutFile(null);
    setCvFile(null);
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">
        Profile Settings
      </h1>

      <ProfileForm
        profile={profile}
        saving={saving}
        onUpdate={handleUpdate}

        /* file handlers */
        onChangeHero={(e) => setHeroFile(e.target.files[0])}
        onChangeAbout={(e) => setAboutFile(e.target.files[0])}
        onChangeCV={(e) => setCvFile(e.target.files[0])}
      />

    </div>
  );
}
