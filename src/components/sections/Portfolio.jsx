"use client";

import { useState, useRef } from "react";
import { useProjects } from "@/hooks/useProjects";
import ProjectItem from "@/components/sections/ProjectItem";
import ProjectGalleryModal from "@/components/sections/ProjectGalleryModal";
import Skeleton from "@/components/ui/Skeleton";

export default function Portfolio() {
  const { projects, loading } = useProjects();

  const [activeProject, setActiveProject] = useState(null);

  const sliderRef = useRef(null);

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

  if (loading) {
    return (
      <section className="py-24 px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-xl" />
        ))}
      </section>
    );
  }

  // split project per 4 item (1 slide = 4 project)
  const slides = [];
  for (let i = 0; i < projects.length; i += 4) {
    slides.push(projects.slice(i, i + 4));
  }

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hiddenbg-gradient-to-b from-[var(--bg-soft)] to-[var(--bg-main)]"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        PROJECTS
      </h2>

      {/* ARROW LEFT */}
      <button
        onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                       bg-black/50 hover:bg-black/70 text-white 
                       w-12 h-12 rounded-full flex items-center justify-center glow"
          >
        ◀
      </button>

      {/* ARROW RIGHT */}
      <button
        onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                       bg-black/50 hover:bg-black/70 text-white 
                       w-12 h-12 rounded-full flex items-center justify-center glow"
          >
        ▶
      </button>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-10 overflow-x-auto snap-x snap-mandatory 
                   px-6 pb-4 scrollbar-hide scroll-smooth"
      >
        {slides.map((group, index) => (
          <div
            key={index}
            className="min-w-full snap-center grid grid-cols-2 gap-6"
          >
            {group.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onClick={setActiveProject}
              />
            ))}
          </div>
        ))}
      </div>

      {/* MODAL GALLERY */}
      {activeProject && (
        <ProjectGalleryModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
