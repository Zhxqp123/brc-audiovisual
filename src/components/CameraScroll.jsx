import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "@/components/ui/image";

gsap.registerPlugin(ScrollTrigger);

const FRAME =
  "https://media.base44.com/images/public/6ab545b1d7157c5744f63a53/a389b307b_generated_5de80037.jpg";

export default function CameraScroll() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
          },
        });

        tl.from(".cam-frame", { scale: 1.25, duration: 1, ease: "none" }, 0)
          .from(".cam-frame", { opacity: 0.2, duration: 0.4 }, 0)
          .from(
            ".cam-line",
            { yPercent: 60, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
            0.15
          )
          .from(
            ".cam-meta",
            { opacity: 0, x: 20, duration: 0.4, stagger: 0.08 },
            0.3
          )
          .to(".cam-frame", { scale: 1.6, duration: 1, ease: "none" }, 0.5)
          .to(".cam-overlay", { opacity: 1, duration: 0.4 }, 0.7);
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(".cam-line", {
          yPercent: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".cam-meta", {
          opacity: 0,
          y: 16,
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-background grain"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="cam-frame relative w-full h-full overflow-hidden">
          <Image
            src={FRAME}
            alt="Lente de câmera em movimento"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="cam-overlay absolute inset-0 bg-background opacity-0" />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-5 sm:px-10 max-w-[1400px] mx-auto">
        <p className="cam-meta text-[10px] tracking-[0.4em] text-accent mb-6">
          REC ● 00:01:24:08
        </p>
        <h2 className="font-heading font-bold leading-[0.95] tracking-tight text-foreground text-[10vw] sm:text-[7vw] lg:text-[5.5vw] max-w-4xl">
          <span className="block overflow-hidden">
            <span className="cam-line block">O SCROLL</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cam-line block text-muted-foreground">É A CÂMERA.</span>
          </span>
        </h2>
        <p className="cam-meta mt-7 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
          Cada movimento revela um novo plano. A narrativa avança no seu ritmo —
          controlada, intencional, cinematográfica.
        </p>
        <div className="cam-meta mt-8 flex items-center gap-6 text-[10px] tracking-[0.3em] text-muted-foreground">
          <span>ISO 800</span>
          <span>f/1.8</span>
          <span>24fps</span>
          <span className="hidden sm:inline">ANAMORPHIC</span>
        </div>
      </div>
    </section>
  );
}