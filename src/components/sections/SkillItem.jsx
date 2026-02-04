"use client";

import { getPublicImageUrl } from "@/services/skillStorage.service";

function levelToPercent(level) {
  if (!level) return 35;

  const l = level.toLowerCase();

  if (l.includes("beginner")) return 35;
  if (l.includes("intermediate")) return 55;
  if (l.includes("expert")) return 85;

  return 40;
}

export default function SkillItem({ skill, onClick }) {
  const percent = levelToPercent(skill.level);

  const imageUrl = skill.image_path
    ? getPublicImageUrl(skill.image_path)
    : "";

  return (
    <div
      onClick={() => onClick?.(skill)}
      className="
        relative cursor-pointer
        bg-white/5 border border-white/10
        rounded-2xl p-5 space-y-4
        glow transition-all duration-500
        hover:scale-105 hover:border-[var(--accent)]
        hover:shadow-[0_0_35px_var(--accent-soft)]
        group fade-up
      "
    >

      {/* AMBIENT GLOW */}
      <div className="
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        bg-[radial-gradient(circle_at_top,var(--accent-soft),transparent_70%)]
        transition pointer-events-none
      " />

      {/* ICON */}
      {imageUrl && (
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black/40 z-10">
          <img
            src={imageUrl}
            className="w-full h-full object-cover 
                       group-hover:scale-110 transition duration-500"
          />
        </div>
      )}

      {/* NAME */}
      <h3 className="relative z-10 text-lg font-semibold">
        {skill.name}
      </h3>

      {/* LEVEL */}
      <p className="relative z-10 text-sm text-gray-400">
        {skill.level}
      </p>

      {/* PROGRESS BAR */}
      <div className="relative z-10 w-full h-2 bg-white/10 rounded-full overflow-hidden">

        <div
          className="
            h-full bg-[var(--accent)]
            transition-all duration-1000 ease-out
            shadow-[0_0_12px_var(--accent)]
          "
          style={{ width: `${percent}%` }}
        />

      </div>

    </div>
  );
}
