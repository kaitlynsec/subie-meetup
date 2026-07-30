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

const animateLettersOnScroll = (containerRef: MutableRefObject<any>) => {
  const lettersContainer = containerRef.current;
  const letterElements = lettersContainer?.querySelectorAll(".letter");
  const maxTravel = lettersContainer?.offsetHeight ?? window.innerHeight;

  letterElements.forEach((letter: Element) => {
    gsap.to(letter, {
      y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * maxTravel,
      ease: "power2.out",
      duration: 0.8,
      scrollTrigger: {
        // Scope the trigger to this component's own container instead of
        // document.documentElement, so it only animates/exists while this
        // section is in view.
        trigger: lettersContainer,
        start: "top top",
        end: "bottom top",
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
      className="letter text-6xl font-semibold xs:text-[90px] xs:leading-none md:text-[120px] lg:text-[150px] xl:text-[210px] "
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
      className="relative ml-8 h-screen overflow-hidden scroll-smooth"
    >
      <div className="-mt-28 mb-36 flex h-screen flex-col justify-end lg:mb-24">
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
