"use client";

import { useEffect } from "react";
import { getPublicImageUrl } from "@/services/skillStorage.service";

export default function SkillGalleryModal({ skill, onClose }) {

  const imageUrl = skill.image_path
    ? getPublicImageUrl(skill.image_path)
    : "";

  // ESC close
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl w-full px-6"
      >
        <img
          src={imageUrl}
          className="w-full max-h-[80vh] object-contain rounded-2xl glow fade-in"
        />

        <p className="text-center mt-4 text-gray-300">
          {skill.name} — {skill.level}
        </p>
      </div>
    </div>
  );
}
