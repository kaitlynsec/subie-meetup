"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { LetterDisplay } from "./letter_display";

gsap.registerPlugin(ScrollTrigger);
const lines = ["welcome", "to", "subie", "club"];
function getRandomRotation() {
  return Math.random() * 60 - 30;
}
function animateLettersOnScroll(ref: React.RefObject<HTMLDivElement>) {
  const nodes = ref.current?.querySelectorAll<HTMLElement>(".letter") || [];
  nodes.forEach((letter) => {
    const speed = parseFloat(letter.dataset.speed || "1");
    gsap.to(letter, {
      y: (1 - speed) * ScrollTrigger.maxScroll(window),
      rotation: getRandomRotation(),
      ease: "power2.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });
  });
}
export function LetterCollision() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    animateLettersOnScroll(ref);
    ScrollTrigger.addEventListener("refreshInit", () =>
      ScrollTrigger.refresh(),
    );
  }, []);
  return (
    <div ref={ref} className="ml-8 scroll-smooth">
      <div className="-mt-28 mb-36 flex h-screen flex-col justify-end lg:mb-24">
        <div className="flex flex-wrap">
          <LetterDisplay word={lines[0]} />
          <div className="w-4 sm:w-10" />
          <LetterDisplay word={lines[1]} />
        </div>
        <div className="flex flex-wrap">
          <LetterDisplay word={lines[2]} />
          <div className="w-4 sm:w-10" />
          <LetterDisplay word={lines[3]} />
        </div>
      </div>
    </div>
  );
}
