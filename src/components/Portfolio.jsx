import { useState, useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { projects, projectFilters } from "@/data/projects";
import VideoModal from "@/components/VideoModal";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const root = useRef(null);
  const grid = useRef(null);
  const [filter, setFilter] = useState("TODOS");
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () =>
      filter === "TODOS"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pf-head > *", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!grid.current) return;
    gsap.fromTo(
      grid.current.querySelectorAll(".pf-card"),
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }
    );
  }, [filter]);

  return (
    <section
      id="trabalhos"
      ref={root}
      className="relative py-24 sm:py-36 px-5 sm:px-10 bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="pf-head mb-12 sm:mb-16">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-5">
            NOSSOS TRABALHOS
          </p>
          <h2 className="font-heading font-bold leading-[1] tracking-tight text-foreground text-5xl sm:text-7xl lg:text-8xl max-w-3xl">
            Projetos que <span className="text-muted-foreground">ganharam movimento.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground text-sm sm:text-base">
            Uma seleção de projetos produzidos pela Coelho AudioVisual.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 sm:px-5 py-2.5 text-[10px] sm:text-[11px] tracking-[0.2em] border transition-all duration-300 ${
                filter === f
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          ref={grid}
          className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-5 auto-rows-[minmax(180px,auto)]"
        >
          {filtered.map((p) => {
            const spanClass =
              p.span === "wide"
                ? "lg:col-span-7 lg:row-span-2"
                : "lg:col-span-5 lg:row-span-2";
            const aspect =
              p.type === "vertical" ? "aspect-[9/16]" : "aspect-video";
            return (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className={`pf-card group relative overflow-hidden bg-card border border-border text-left ${spanClass}`}
              >
                <div className={`relative w-full ${aspect} lg:h-full`}>
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-foreground/40 backdrop-blur-sm bg-background/20 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                      <Play size={20} className="text-foreground fill-foreground ml-0.5" />
                    </span>
                  </span>

                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-accent mb-1.5">
                      {p.category}
                    </p>
                    <h3 className="font-heading text-base sm:text-xl font-medium text-foreground leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <span className="absolute top-3 left-3 h-5 w-5 border-l border-t border-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-3 right-3 h-5 w-5 border-r border-t border-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <VideoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}