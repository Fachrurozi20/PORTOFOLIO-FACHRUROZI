"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import Particles from "@/components/ui/Particles";
import ScrollTop from "@/components/ui/ScrollTop";

import useReveal from "@/hooks/useReveal";

export default function HomeContainer() {
  useReveal(); // 🔥 aktifkan reveal system

  return (
    <>
      <Particles />
      <Navbar />

      <main className="space-y-32 pt-24">
        <Hero />

        <div className="reveal delay-1">
          <About />
        </div>

        <div className="reveal delay-2">
          <Portfolio />
        </div>

        <div className="reveal delay-3">
          <SkillsSection />
        </div>

        <div className="reveal">
          <ContactSection />
        </div>
      </main>

      <ScrollTop />
    </>
  );
}
