"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/nav/index";
import { LetterCollision } from "@/components/letter_collision";
import Magnetic from "@/components/magnetic";
import { ArrowDownRight } from "lucide-react";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToHero = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.2 });
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.refresh();

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <LetterCollision />

      <main>
        <section id="home" className="h-screen">
          <h1 className="text-6xl">Home</h1>
        </section>

        <section id="about" className="h-screen">
          <h1 className="text-6xl">About</h1>
        </section>

        <section id="events" className="h-screen">
          <h1 className="text-6xl">Events</h1>
        </section>

        <section id="gallery" className="h-screen">
          <h1 className="text-6xl">Gallery</h1>
        </section>

        <section id="contact" className="h-screen">
          <h1 className="text-6xl">Contact</h1>
        </section>
      </main>

      {/* ✅ Scroll-to-top button */}
      {showScrollButton && (
        <Magnetic>
          <div
            className="fixed bottom-4 right-8 flex cursor-pointer items-center space-x-2 text-3xl font-semibold sm:bottom-8"
            onClick={scrollToHero}
          >
            <p>Scroll</p>
            <ArrowDownRight strokeWidth={3} className="size-6" />
          </div>
        </Magnetic>
      )}
    </div>
  );
}
