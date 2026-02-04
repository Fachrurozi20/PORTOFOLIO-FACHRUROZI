"use client";

import { useRef, useState } from "react";
import { useSkills } from "@/hooks/useSkills";
import SkillItem from "./SkillItem";
import SkillGalleryModal from "./SkillGalleryModal";
import Skeleton from "@/components/ui/Skeleton";

export default function SkillsSection() {
  const { skills, loading } = useSkills();
  const [activeSkill, setActiveSkill] = useState(null);

  const sliderRef = useRef(null);

  if (loading) {
    return (
      <section className="py-20 px-6 grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </section>
    );
  }

  // split per 6 skill (3x2)
  const slides = [];
  for (let i = 0; i < skills.length; i += 6) {
    slides.push(skills.slice(i, i + 6));
  }

  function scrollLeft() {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hiddenbg-gradient-to-b from-[var(--bg-soft)] to-[var(--bg-main)]"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        My Skills
      </h2>

      {/* ARROWS */}
      {slides.length > 1 && (
        <>
          <button
        onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                       bg-black/50 hover:bg-black/70 text-white 
                       w-12 h-12 rounded-full flex items-center justify-center glow"
          >
        ◀
      </button>

          <button
        onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                       bg-black/50 hover:bg-black/70 text-white 
                       w-12 h-12 rounded-full flex items-center justify-center glow"
          >
        ▶
      </button>
        </>
      )}

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-10 overflow-x-auto snap-x snap-mandatory px-6 scrollbar-hide"
      >
        {slides.map((group, idx) => (
          <div
            key={idx}
            className="min-w-full snap-center grid grid-cols-3 gap-6"
          >
            {group.map((skill) => (
              <SkillItem
                key={skill.id}
                skill={skill}
                onClick={setActiveSkill}
              />
            ))}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeSkill && (
        <SkillGalleryModal
          skill={activeSkill}
          onClose={() => setActiveSkill(null)}
        />
      )}
    </section>
  );
}
