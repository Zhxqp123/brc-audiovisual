import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { scrollToId } from "@/lib/useSmoothScroll";

const links = [
  { label: "INÍCIO", id: "hero" },
  { label: "TRABALHOS", id: "trabalhos" },
  { label: "CLIENTES", id: "clientes" },
  { label: "SOBRE", id: "sobre" },
  { label: "CONTATO", id: "contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), 50);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[1400px] px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button
            onClick={() => go("hero")}
            className="font-heading font-semibold tracking-[0.18em] text-[13px] sm:text-sm text-foreground leading-none"
          >
            COELHO
            <span className="block text-[9px] sm:text-[10px] tracking-[0.42em] text-muted-foreground mt-1">
              AUDIOVISUAL
            </span>
          </button>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group text-[11px] tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {l.label}
                <span className="block h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />
              </button>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] tracking-[0.22em] text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground px-4 py-2.5 transition-all duration-300"
            >
              WHATSAPP <span aria-hidden>→</span>
            </a>
          </div>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full justify-center px-8 gap-2">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`text-left font-heading text-3xl tracking-tight py-3 border-b border-border transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center gap-3 text-accent font-heading tracking-widest text-lg"
          >
            <MessageCircle size={20} /> WHATSAPP →
          </a>
        </div>
      </div>
    </>
  );
}