"use client";

import { getPublicImageUrl } from "@/services/storage.service";

export default function ProjectItem({ project, onClick }) {

  // ambil gambar pertama sebagai cover
  const cover =
    project.images && project.images.length > 0
      ? getPublicImageUrl(project.images[0].image_path)
      : "";

  return (
    <div
      onClick={() => onClick(project)}
      className="relative h-72 rounded-2xl overflow-hidden cursor-pointer 
                 bg-black/40 glow group transition hover:scale-[1.03]"
    >

      {/* IMAGE */}
      {cover && (
        <img
          src={cover}
          className="absolute inset-0 w-full h-full object-cover 
                     group-hover:scale-110 transition duration-700"
        />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition" />

      {/* TEXT */}
      <div className="relative z-10 p-5 h-full flex flex-col justify-end">

        <h3 className="text-lg font-semibold text-white">
          {project.title}
        </h3>

        <p className="text-sm text-gray-300 mt-1">
          {project.type}
        </p>

        <p className="text-sm text-gray-200 mt-2 line-clamp-2">
          {project.description}
        </p>

        {project.github_url && (
          <span className="text-[var(--accent)] text-sm mt-3">
            View →
          </span>
        )}

      </div>
    </div>
  );
}
