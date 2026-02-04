"use client";

import { useProfile } from "@/hooks/useProfile";
import { getPhotoUrl } from "@/services/profileStorage.service";

export default function About() {
  const { profile, loading } = useProfile();

  if (loading || !profile) return null;

  const aboutPhoto = profile.about_photo_path
    ? getPhotoUrl(profile.about_photo_path)
    : profile.photo_path
    ? getPhotoUrl(profile.photo_path)
    : "";

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden flex items-center px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 items-start fade-up">

        {/* IMAGE */}
        {aboutPhoto && (
          <div className="flex justify-center md:justify-start self-center">
            <div className="w-72 md:w-80 rounded-2xl overflow-hidden glow">
              <img
                src={aboutPhoto}
                alt="About"
                className="w-full object-cover"
              />
            </div>
          </div>
        )}


        {/* TEXT */}
        <div className="md:col-span-2 space-y-6">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            About Me
          </h2>

          <p
            className="
              text-[var(--text-soft)]
              text-base md:text-lg lg:text-xl
              leading-relaxed
              text-justify
              columns-1 md:columns-2 lg:columns-2
              gap-10
            "
          >
            {profile.bio}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-3 pt-4">

            <span className="px-5 py-2 border border-white/20 rounded-full text-sm hover:glow transition">
              Continuous Learner
            </span>

            <span className="px-5 py-2 border border-white/20 rounded-full text-sm hover:glow transition">
              Problem Solver
            </span>

            <span className="px-5 py-2 border border-white/20 rounded-full text-sm hover:glow transition">
              Growth Mindset
            </span>

            <span className="px-5 py-2 border border-white/20 rounded-full text-sm hover:glow transition">
              Critical Thinker
            </span>

            <span className="px-5 py-2 border border-white/20 rounded-full text-sm hover:glow transition">
              Adaptable
            </span>

          </div>
        </div>

      </div>
    </section>
  );
}
