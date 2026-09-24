import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["IDEIAS", "GANHAM", "MOVIMENTO."];

export default function ImpactSection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".impact-word", {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 40%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative py-28 sm:py-40 px-5 sm:px-10 bg-background overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-heading font-extrabold leading-[0.95] tracking-tight text-foreground text-[13vw] sm:text-[10vw] lg:text-[8vw]">
          {WORDS.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="impact-word block">
                {w}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}