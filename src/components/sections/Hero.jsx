"use client";

import { useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { getPhotoUrl } from "@/services/profileStorage.service";
import useParallax from "@/hooks/useParallax";
import Skeleton from "@/components/ui/Skeleton";
import { getCVUrl } from "@/services/profileStorage.service";


export default function Hero() {
  const { profile, loading } = useProfile();

  const bgRef = useRef(null);

  // 🔥 aktifkan parallax
  useParallax(bgRef, 0.2
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl">

          <Skeleton className="w-64 md:w-80 h-80 rounded-2xl" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>

        </div>
      </section>
    );
  }
  
  const cvUrl = profile.cv_path
  ? getCVUrl(profile.cv_path)
  : "";

  const photoUrl = profile.photo_path
    ? getPhotoUrl(profile.photo_path)
    : "";

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center px-6 md:px-20"
    >
      {/* PARALLAX BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110"
      ></div>


      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center fade-up">

        {/* PHOTO */}
        <div className="flex justify-center md:justify-start">
          {photoUrl && (
            <div className="rounded-2xl overflow-hidden glow w-64 md:w-80">
              <img
                src={photoUrl}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* TEXT */}
        <div className="text-white space-y-5 text-center md:text-left">

          <p className="tracking-widest text-sm text-gray-300">
            HELLO, MY NAME IS
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {profile.full_name}
          </h1>

          <p className="text-lg text-gray-200">
            {profile.headline}
          </p>

          <p className="text-gray-300 max-w-xl text-justify">
            {profile.hero_about}
          </p>

          <div className="pt-4 flex gap-4 justify-center md:justify-start">

          <a
            href="#projects"
            className="inline-block bg-[var(--accent)] text-black px-6 py-3 rounded-full font-semibold
                      hover:scale-105 hover:shadow-lg transition"
          >
            View My Work
          </a>

         {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              className="inline-block border border-[var(--accent)] text-[var(--accent)]
                        px-6 py-3 rounded-full font-semibold
                        hover:bg-[var(--accent)] hover:text-black transition"
            >
              View CV
            </a>
          )}
        </div>
          
        </div>
      </div>
    </section>
  );
}
