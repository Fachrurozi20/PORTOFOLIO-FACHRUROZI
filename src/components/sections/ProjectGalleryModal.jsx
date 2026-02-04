"use client";

import { useEffect, useState, useRef } from "react";
import { getPublicImageUrl } from "@/services/storage.service";

export default function ProjectGalleryModal({ project, onClose }) {
  const images = project.images || [];
  const [index, setIndex] = useState(0);

  const startX = useRef(null);

  if (images.length === 0) return null;

  const current = getPublicImageUrl(images[index].image_path);

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  /* ESC close */
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* SWIPE HANDLER */
  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (!startX.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 50) next();
    if (diff < -50) prev();

    startX.current = null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center fade-in"
    >

      {/* STOP CLOSE ON IMAGE AREA */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative max-w-4xl w-full px-6"
      >

        <img
          src={current}
          className="w-full max-h-[80vh] object-contain rounded-xl glow 
                     transition-all duration-500"
        />

        {/* ARROWS */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 
                         text-white text-3xl px-4 hover:text-[var(--accent)]"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 
                         text-white text-3xl px-4 hover:text-[var(--accent)]"
            >
              ›
            </button>
          </>
        )}

        {/* CLOSE BTN */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-[var(--accent)]"
        >
          ✕
        </button>

      </div>
    </div>
  );
}
