import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "EDIÇÃO DE VÍDEOS", desc: "Transformamos material bruto em conteúdos dinâmicos e profissionais." },
  { title: "REELS", desc: "Conteúdo vertical pensado para redes sociais." },
  { title: "SHORTS", desc: "Vídeos rápidos e envolventes para YouTube." },
  { title: "CONTEÚDO PARA CRIADORES", desc: "Edição adaptada ao estilo e identidade de cada criador." },
  { title: "CONTEÚDO PARA MARCAS", desc: "Conteúdo audiovisual para empresas, produtos e serviços." },
];

export default function Services() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sv-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".sv-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sv-list", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-24 sm:py-36 px-5 sm:px-10 bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="sv-head mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-5">SERVIÇOS</p>
          <h2 className="font-heading font-bold leading-[1] tracking-tight text-foreground text-5xl sm:text-7xl lg:text-8xl">
            O que fazemos.
          </h2>
        </div>

        <div className="sv-list divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="sv-card group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 sm:py-10 hover:bg-card/50 transition-colors duration-400 px-2 sm:px-4"
            >
              <span className="md:col-span-1 text-[10px] tracking-[0.3em] text-muted-foreground pt-2">
                0{i + 1}
              </span>
              <h3 className="md:col-span-5 font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground group-hover:text-accent transition-colors duration-400">
                {s.title}
              </h3>
              <p className="md:col-span-6 text-sm sm:text-base text-muted-foreground leading-relaxed self-center max-w-md">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}