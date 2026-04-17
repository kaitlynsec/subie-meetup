"use client";
import React, { useEffect } from "react";
import { LetterCollision } from "@/components/letter_collision";
import Navbar from "@/components/nav/index";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Navbar />
      <section id="home" className="h-screen">
        <LetterCollision />
      </section>
      <section id="about" className="h-screen">
        ...
      </section>
      <section id="events" className="h-screen">
        ...
      </section>
      <section id="gallery" className="h-screen">
        ...
      </section>
      <section id="contact" className="h-screen">
        ...
      </section>
    </main>
  );
}
