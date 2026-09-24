import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whatsappLink } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      tl.from(".cta-line", {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "expo.out",
      }).from(
        ".cta-btn",
        { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contato"
      ref={root}
      className="relative py-32 sm:py-48 px-5 sm:px-10 bg-background border-t border-border overflow-hidden grain"
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-heading font-extrabold leading-[0.92] tracking-tight text-foreground text-[13vw] sm:text-[10vw] lg:text-[8.5vw]">
          <span className="block overflow-hidden">
            <span className="cta-line block">TEM UM PROJETO</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block text-muted-foreground">EM MENTE?</span>
          </span>
        </h2>
        <p className="cta-line mt-8 sm:mt-10 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Vamos transformar sua ideia em um conteúdo que merece ser visto.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="cta-btn group mt-10 sm:mt-12 inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 sm:px-10 py-5 text-[11px] sm:text-xs tracking-[0.24em] font-medium hover:bg-foreground hover:text-background transition-colors duration-400"
        >
          FALAR COM A COELHO AUDIOVISUAL
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </a>
      </div>
    </section>
  );
}