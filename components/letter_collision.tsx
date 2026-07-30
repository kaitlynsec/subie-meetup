import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
 
gsap.registerPlugin(ScrollTrigger);
 
const welcome = "welcome ";
const to = "to ";
const subie = "subie ";
const club = "club";
 
function getRandomSpeed() {
  const randomDecimal = Math.random();
  return 0.8 + randomDecimal * (1.5 - 0.8);
}
function getRandomRotation() {
  return Math.random() * 60 - 30;
}
function getRandomGlow() {
  // Subtle old-Subaru star-cluster blue glow.
  const intensity = 6 + Math.random() * 8; // 6-14px
  return `0 0 4px #A9D6FF, 0 0 ${intensity}px #4A90D9, 0 0 ${intensity * 1.4}px #003478`;
}
 
const animateLettersOnScroll = (containerRef: MutableRefObject<any>) => {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll(".letter");
 
  // Cap travel distance to this container's own height (doesn't bleed into
  // sections below), but use the document-based trigger, which is the
  // reliable config that actually animates.
  const maxTravel = lettersContainer?.offsetHeight ?? window.innerHeight;
 
  letterElements.forEach((letter: Element) => {
    gsap.to(letter, {
      y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * maxTravel,
      ease: "power2.out",
      duration: 0.8,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        invalidateOnRefresh: true,
        scrub: 0.5,
      },
      rotation: getRandomRotation(),
    });
  });
};
 
function LetterDisplay({ word }: { word: string }) {
  return word.split("").map((letter, index) => (
    <div
      key={index}
      className="letter relative text-6xl font-semibold text-[#DCEBFF] xs:text-[90px] xs:leading-none md:text-[120px] lg:text-[150px] xl:text-[210px]"
      style={{ textShadow: getRandomGlow() }}
      data-speed={getRandomSpeed()}
    >
      {letter}
    </div>
  ));
}
 
export const LetterCollision = forwardRef<HTMLDivElement>((_, forwardedRef) => {
  const containerRef = useRef<HTMLDivElement>(null);
 
  useImperativeHandle(
    forwardedRef,
    () => containerRef.current as HTMLDivElement,
  );
 
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      animateLettersOnScroll(containerRef);
    }, containerRef);
 
    return () => ctx.revert();
  }, []);
 
  return (

    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden scroll-smooth bg-[#00102b]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #003478 0%, #00102b 60%, #000814 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
 
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{
          background: "linear-gradient(to bottom, #00102b, rgba(0,16,43,0))",
        }}
      />
 
      <div className="relative ml-8 -mt-28 mb-36 flex h-screen flex-col justify-end lg:mb-24">
        <div className="flex flex-wrap p-0">
          <LetterDisplay word={welcome} />
          <div className="w-2 xs:w-4 sm:w-10"></div>
          <LetterDisplay word={to} />
        </div>
        <div className="flex flex-wrap">
          <LetterDisplay word={subie} />
          <div className="w-2 xs:w-4 sm:w-10"></div>
          <LetterDisplay word={club} />
        </div>
      </div>
    </div>
  );
});
LetterCollision.displayName = "LetterCollision";