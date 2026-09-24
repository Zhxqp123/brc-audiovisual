import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "@/components/ui/image";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const PHOTO =
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/010db288a_generated_ad839bc2.jpg";

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ab-photo", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".ab-text", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={root}
      className="relative py-24 sm:py-36 px-5 sm:px-10 bg-background border-t border-border overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-border">
            <Image
              src={PHOTO}
              alt="Bernardo Coelho na suíte de edição"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] text-foreground/70">
              FUNDADOR
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="ab-text text-[10px] tracking-[0.4em] text-accent mb-5">SOBRE</p>
          <h2 className="ab-text font-heading font-bold leading-[1] tracking-tight text-foreground text-4xl sm:text-6xl lg:text-7xl mb-8">
            Por trás da <span className="text-muted-foreground">Coelho AudioVisual.</span>
          </h2>
          <p className="ab-text text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
            A Coelho AudioVisual nasceu do trabalho de {site.founder} com edição
            de vídeos e criação de conteúdo para redes sociais.
          </p>
          <p className="ab-text text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            Cada projeto é tratado como uma peça audiovisual — com ritmo,
            intenção e direção de arte. O objetivo é simples: conteúdo que
            prende atenção.
          </p>

          <div className="ab-text flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <p className="font-heading text-2xl sm:text-3xl text-foreground">{site.founder}</p>
              <p className="text-xs tracking-[0.2em] text-muted-foreground mt-1">FUNDADOR / EDITOR DE VÍDEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}