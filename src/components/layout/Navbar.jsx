"use client";

import { useState } from "react";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/50 border-b border-white/10">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-[var(--accent)] font-bold text-lg">
          FACHRUROZI
        </h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6 text-sm">

          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="hover:text-[var(--accent)] transition"
            >
              {l.label}
            </button>
          ))}

        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[var(--bg-main)] shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">

          <button
            onClick={() => setOpen(false)}
            className="text-xl mb-6"
          >
            ✕
          </button>

          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block text-left w-full text-lg hover:text-[var(--accent)] transition"
            >
              {l.label}
            </button>
          ))}
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
          )}

        </div>
      </div>

    </nav>
  );
}
