import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", title: "BRIEFING", desc: "Entendemos o objetivo e a identidade do projeto." },
  { n: "02", title: "MATERIAL", desc: "O cliente envia vídeos, referências e informações." },
  { n: "03", title: "EDIÇÃO", desc: "A Coelho AudioVisual transforma o material em conteúdo profissional." },
  { n: "04", title: "AJUSTES", desc: "Realizamos os ajustes necessários." },
  { n: "05", title: "ENTREGA", desc: "O conteúdo final é entregue pronto para publicação." },
];

export default function Process() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pr-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const track = root.current.querySelector(".pr-track");
        if (track) {
          gsap.to(track, {
            xPercent: -70,
            ease: "none",
            scrollTrigger: {
              trigger: ".pr-wrap",
              start: "top top",
              end: "+=160%",
              pin: true,
              scrub: 1,
            },
          });
        }
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".pr-step", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pr-list", start: "top 75%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-background border-t border-border">
      <div className="py-20 sm:py-28 px-5 sm:px-10 pr-wrap-trigger">
        <div className="pr-head max-w-[1400px] mx-auto mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-5">PROCESSO</p>
          <h2 className="font-heading font-bold leading-[1] tracking-tight text-foreground text-4xl sm:text-6xl lg:text-7xl max-w-3xl">
            Do material bruto ao conteúdo final.
          </h2>
        </div>
      </div>

      <div className="pr-wrap hidden md:block h-[60vh] overflow-hidden">
        <div className="pr-track flex gap-8 h-full items-center px-10 will-change-transform">
          {steps.map((s) => (
            <div
              key={s.n}
              className="pr-step shrink-0 w-[60vw] max-w-2xl border border-border p-10 bg-card"
            >
              <span className="font-heading text-7xl font-extrabold text-foreground/10">{s.n}</span>
              <h3 className="mt-4 font-heading text-3xl font-medium text-foreground">{s.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">{s.desc}</p>
            </div>
          ))}
          <div className="shrink-0 w-[20vw]" />
        </div>
      </div>

      <div className="pr-list md:hidden px-5 pb-20 space-y-4">
        {steps.map((s) => (
          <div key={s.n} className="pr-step border border-border p-6 bg-card">
            <span className="font-heading text-5xl font-extrabold text-foreground/10">{s.n}</span>
            <h3 className="mt-3 font-heading text-2xl font-medium text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}