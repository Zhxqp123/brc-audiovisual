import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { scrollToId } from "@/lib/useSmoothScroll";
import { Image } from "@/components/ui/image";

const HERO_IMG =
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/ddd3de416_generated_3e93dc63.jpg";

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".hero-curtain", {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
      })
        .from(
          ".hero-line",
          { yPercent: 120, duration: 1.1, stagger: 0.12, ease: "power4.out" },
          "-=0.3"
        )
        .from(
          ".hero-blur",
          { opacity: 0, filter: "blur(14px)", duration: 1, ease: "expo.out" },
          "-=0.6"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 24, duration: 0.9 },
          "-=0.7"
        )
        .from(
          ".hero-tag",
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.6"
        )
        .from(
          ".hero-btn",
          { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 },
          "-=0.5"
        )
        .from(
          ".hero-scroll",
          { opacity: 0, y: -10, duration: 0.7 },
          "-=0.3"
        )
        .from(
          ".hero-corner",
          { opacity: 0, scale: 0.6, duration: 0.8, stagger: 0.08 },
          "-=0.9"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background grain"
    >
      <div className="hero-curtain absolute inset-0 z-30 bg-background" />

      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Suíte de edição cinematográfica da Coelho AudioVisual"
          className="w-full h-full object-cover animate-slow-zoom opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {["top-6 left-6 border-l border-t", "top-6 right-6 border-r border-t", "bottom-6 left-6 border-l border-b", "bottom-6 right-6 border-r border-b"].map(
        (c) => (
          <span
            key={c}
            className={`hero-corner absolute z-20 h-10 w-10 border-foreground/30 ${c}`}
          />
        )
      )}

      <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
        <p className="hero-tag text-[10px] sm:text-xs tracking-[0.4em] text-accent mb-6 sm:mb-8 font-medium">
          EDIÇÃO DE VÍDEOS PARA CRIADORES, PROFISSIONAIS E MARCAS
        </p>

        <h1 className="font-heading font-extrabold leading-[0.92] tracking-tight text-foreground text-[10vw] sm:text-[11vw] lg:text-[8.5vw]">
          <span className="block overflow-hidden">
            <span className="hero-line block">COELHO</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-muted-foreground">AUDIOVISUAL</span>
          </span>
        </h1>

        <div className="hero-blur mt-6 sm:mt-8 max-w-xl">
          <p className="font-heading text-xl sm:text-3xl lg:text-4xl font-medium leading-tight text-foreground text-balance">
            Conteúdo que prende atenção.
          </p>
        </div>

        <p className="hero-sub mt-5 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
          Transformamos vídeos e ideias em conteúdos audiovisuais que conectam,
          comunicam e geram impacto.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => scrollToId("trabalhos")}
            className="hero-btn group relative overflow-hidden bg-foreground text-background px-7 py-4 text-[11px] tracking-[0.24em] font-medium transition-colors"
          >
            <span className="relative z-10">VER TRABALHOS</span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-accent-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              VER TRABALHOS
            </span>
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="hero-btn group flex items-center justify-center gap-2 border border-foreground/30 hover:border-accent hover:text-accent text-foreground px-7 py-4 text-[11px] tracking-[0.24em] font-medium transition-colors duration-300"
          >
            FALAR NO WHATSAPP
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[9px] tracking-[0.3em]">SCROLL</span>
        <span className="relative h-9 w-5 border border-foreground/30 rounded-full flex justify-center pt-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-scroll-dot" />
        </span>
        <ArrowDown size={12} className="opacity-40" />
      </div>
    </section>
  );
}