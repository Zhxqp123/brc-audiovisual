import { useEffect } from "react";
import { X } from "lucide-react";

export default function VideoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  const isYouTube = project.videoUrl && /youtube|youtu\.be/.test(project.videoUrl);
  const isVimeo = project.videoUrl && /vimeo/.test(project.videoUrl);

  const getYouTubeEmbedSrc = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
    );
    const id = match ? match[1] : null;
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
  };
  const youTubeEmbed = isYouTube ? getYouTubeEmbedSrc(project.videoUrl) : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md animate-in fade-in duration-300" />
      <div
        className="relative z-10 w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-accent mb-1">
              {project.category}
            </p>
            <h3 className="font-heading text-2xl sm:text-3xl font-medium">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className={`relative w-full bg-black border border-border overflow-hidden ${
            project.type === "vertical" ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video"
          }`}
        >
          {project.videoUrl ? (
            isYouTube ? (
              <iframe
                src={youTubeEmbed}
                title={project.title}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : isVimeo ? (
              <iframe
                src={project.videoUrl}
                title={project.title}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={project.videoUrl}
                poster={project.thumbnail}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10">
                <p className="text-[10px] tracking-[0.3em] text-accent mb-3">
                  VÍDEO EM BREVE
                </p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Adicione a URL do vídeo para reproduzir aqui.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}