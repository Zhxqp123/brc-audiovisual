import { site, whatsappLink } from "@/data/site";
import { scrollToId } from "@/lib/useSmoothScroll";

export default function Footer() {
  const links = [
    { label: "Trabalhos", id: "trabalhos" },
    { label: "Clientes", id: "clientes" },
    { label: "Sobre", id: "sobre" },
    { label: "Instagram", href: site.instagramUrl },
    { label: "WhatsApp", href: whatsappLink },
  ];

  return (
    <footer className="relative bg-background border-t border-border px-5 sm:px-10 py-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <button
              onClick={() => scrollToId("hero")}
              className="font-heading font-semibold tracking-[0.18em] text-sm text-foreground leading-none text-left"
            >
              COELHO
              <span className="block text-[10px] tracking-[0.42em] text-muted-foreground mt-1.5">
                AUDIOVISUAL
              </span>
            </button>
            <p className="mt-6 font-heading text-2xl sm:text-3xl text-foreground max-w-xs leading-tight">
              Conteúdo que prende atenção.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-5">NAVEGAÇÃO</p>
            <ul className="space-y-3">
              {links.map((l) =>
                l.id ? (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      {l.label}
                    </button>
                  </li>
                ) : (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      {l.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-5">CONTATO</p>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-foreground/80 hover:text-accent transition-colors duration-300 mb-3"
            >
              {site.instagramHandle}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="block text-sm text-foreground/80 hover:text-accent transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-[11px] tracking-wide text-muted-foreground">
          <p>© 2026 Coelho AudioVisual. Todos os direitos reservados.</p>
          <p>{site.founder} · Fundador / Editor de Vídeo</p>
        </div>
      </div>
    </footer>
  );
}