import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 2, suffix: "+", label: "anos de experiência" },
  { value: null, suffix: "+", label: "vídeos produzidos", placeholder: "XX" },
  { value: null, suffix: "+", label: "clientes", placeholder: "XX" },
  { value: null, suffix: "+", label: "visualizações", placeholder: "XX" },
];

export default function Stats() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".st-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      gsap.utils.toArray(".st-num").forEach((el) => {
        const data = el.dataset;
        if (data.value && data.value !== "0") {
          gsap.from(el, {
            textContent: 0,
            duration: 1.6,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        }
      });

      gsap.from(".st-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".st-grid", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-24 sm:py-32 px-5 sm:px-10 bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="st-head mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-5">NÚMEROS</p>
          <h2 className="font-heading font-bold leading-[1] tracking-tight text-foreground text-4xl sm:text-6xl lg:text-7xl max-w-2xl">
            Experiência que aparece no resultado.
          </h2>
        </div>

        <div className="st-grid grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {stats.map((s, i) => (
            <div key={i} className="st-item bg-background p-6 sm:p-10 flex flex-col">
              <span
                className="st-num font-heading font-extrabold text-foreground text-5xl sm:text-7xl leading-none"
                data-value={s.value ?? 0}
              >
                {s.value ? "0" : s.placeholder}
                {s.value ? s.suffix : ""}
              </span>
              <span className="mt-3 text-xs sm:text-sm text-muted-foreground tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}