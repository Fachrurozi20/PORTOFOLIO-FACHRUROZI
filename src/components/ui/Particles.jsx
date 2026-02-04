"use client";

import { useEffect } from "react";

export default function Particles() {
  useEffect(() => {
    const container = document.getElementById("particles");

    for (let i = 0; i < 25; i++) {
      const dot = document.createElement("span");

      dot.className = "particle";
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.animationDelay = Math.random() * 10 + "s";
      dot.style.animationDuration = 15 + Math.random() * 10 + "s";

      container.appendChild(dot);
    }
  }, []);

  return <div id="particles" className="particles-layer"></div>;
}
