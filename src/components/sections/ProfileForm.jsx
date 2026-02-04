"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import {
  getPhotoUrl,
  getCVUrl,
} from "@/services/profileStorage.service";


export default function ProfileForm({
  profile,
  onUpdate,
  saving,

  onChangeHero,
  onChangeAbout,
  onChangeCV,
}) {
  const [form, setForm] = useState({
    full_name: "",
    headline: "",
    hero_about: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        headline: profile.headline || "",
        hero_about: profile.hero_about || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    onUpdate(form);
  }

  const heroPreview = profile?.photo_path
    ? getPhotoUrl(profile.photo_path)
    : "";

  const aboutPreview = profile?.about_photo_path
  ? getPhotoUrl(profile.about_photo_path)
  : "";


  return (
    <form
      onSubmit={submit}
      className="space-y-6 border border-white/10 p-6 rounded-2xl bg-white/5"
    >
      {/* TEXT FIELDS */}
      <Input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <Input
        name="headline"
        value={form.headline}
        onChange={handleChange}
        placeholder="Headline"
      />

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white"
        rows={4}
      />

      <Input
        name="hero_about"
        value={form.hero_about}
        onChange={handleChange}
        placeholder="Short intro for Hero section"
      />


      {/* HERO PHOTO */}
      <div className="space-y-2">
        <p className="text-sm">Hero Photo</p>

        {heroPreview && (
          <img
            src={heroPreview}
            className="w-32 h-32 object-cover rounded-xl glow"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={onChangeHero}
        />
      </div>

      {/* ABOUT PHOTO */}
      <div className="space-y-2">
        <p className="text-sm">About Photo</p>

        {aboutPreview && (
          <img
            src={aboutPreview}
            className="w-32 h-32 object-cover rounded-xl glow"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={onChangeAbout}
        />
      </div>

      {/* CV */}
      <div className="space-y-2">
        {profile?.cv_path && (
          <a
            href={getCVUrl(profile.cv_path)}
            target="_blank"
            className="text-[var(--accent)] underline text-sm"
          >
            View CV
          </a>
        )}

        <p className="text-sm">CV (PDF)</p>

        <input
          type="file"
          accept=".pdf"
          onChange={onChangeCV}
        />
      </div>

      <Button disabled={saving}>
        {saving ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
