import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Decarli Mármores", handle: "@decarlimarmores", url: "https://instagram.com/decarlimarmores" },
  { name: "Julio Ritta", handle: "@julioritta", url: "https://instagram.com/julioritta" },
  { name: "Dr. Marcelo Fauri", handle: "@drmarcelofauri", url: "https://instagram.com/drmarcelofauri" },
  { name: "Iguioficial", handle: "@iguioficial", url: "https://instagram.com/iguioficial" },
  { name: "Dra. Júlia Gross", handle: "@drajuliagross", url: "https://instagram.com/drajuliagross" },
  { name: "Multimetais RS", handle: "@multimetaisrs", url: "https://instagram.com/multimetaisrs" },
];

export default function Clients() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".client-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".cl-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="clientes"
      ref={root}
      className="relative py-24 sm:py-36 px-5 sm:px-10 bg-background border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="cl-head mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-5">CLIENTES</p>
          <h2 className="font-heading font-bold leading-[1] tracking-tight text-foreground text-4xl sm:text-6xl lg:text-7xl max-w-2xl">
            Quem já confiou no nosso trabalho.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {clients.map((c) => (
            <a
              key={c.handle}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="client-card group relative p-6 sm:p-8 border border-border bg-card hover:border-accent/50 transition-colors duration-400 flex flex-col justify-between min-h-[180px]"
            >
              <div className="flex items-start justify-between">
                <span className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/40 group-hover:text-accent group-hover:border-accent/50 transition-colors duration-400">
                  <span className="font-heading text-sm">{c.name.charAt(0)}</span>
                </span>
                <ExternalLink size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-medium text-foreground leading-tight">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-accent tracking-wide">
                  {c.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}