"use client";

import { useEffect } from "react";

export default function useParallax(ref, speed = 0.4) {
  useEffect(() => {
    function handleScroll() {
      if (!ref.current) return;

      const offset = window.scrollY * speed;
      ref.current.style.transform = `translateY(${offset}px)`;
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed]);
}
