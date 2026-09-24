import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const tiles = [
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/30bca2bfa_generated_b1ebb888.jpg",
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/d9c9ea1fb_generated_101218f0.jpg",
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/deaa05dd8_generated_59d7cc64.jpg",
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/a389b307b_generated_5de80037.jpg",
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/ddd3de416_generated_3e93dc63.jpg",
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/010db288a_generated_ad839bc2.jpg",
];

export default function Instagram() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ig-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".ig-tile", {
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ig-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-24 sm:py-32 px-5 sm:px-10 bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="ig-head flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-accent mb-5">INSTAGRAM</p>
            <h2 className="font-heading font-bold leading-[1] tracking-tight text-foreground text-4xl sm:text-6xl lg:text-7xl">
              Acompanhe nosso trabalho.
            </h2>
            <p className="mt-4 text-accent tracking-wide text-sm">{site.instagramHandle}</p>
          </div>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.24em] border border-foreground/30 hover:border-accent hover:text-accent text-foreground px-6 py-4 transition-colors duration-300 w-fit"
          >
            SEGUIR NO INSTAGRAM
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="ig-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {tiles.map((t, i) => (
            <a
              key={i}
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="ig-tile group relative aspect-square overflow-hidden bg-card"
            >
              <img
                src={t}
                alt="Conteúdo Coelho AudioVisual"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-400" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}