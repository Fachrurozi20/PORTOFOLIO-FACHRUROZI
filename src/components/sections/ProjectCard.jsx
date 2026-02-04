"use client";

export default function ProjectCard({ project, onOpen }) {
  return (
    <div
      onClick={() => onOpen(project)}
      className="min-w-[280px] md:min-w-[320px] bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer
                 hover:scale-105 hover:glow transition-all duration-300"
    >
      <div className="p-5 space-y-2">

        <h3 className="text-lg font-semibold">
          {project.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-3">
          {project.description}
        </p>

        <span className="text-xs text-[var(--accent)]">
          {project.type}
        </span>

      </div>
    </div>
  );
}
