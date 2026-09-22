import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Users,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ConclavePhoto {
  id: string;
  title: string;
  tag: string;
  location: string;
  metric: string;
  caption: string;
  imageUrl: string;
}

const CONCLAVE_PHOTOS: ConclavePhoto[] = [
  {
    id: "main-auditorium",
    title: "Grand Conclave Auditorium & Plenary Stage",
    tag: "Conclave Stage",
    location: "CMR Medchal Main Auditorium",
    metric: "2,500+ Seated Capacity",
    caption:
      "State-of-the-art keynote auditorium featuring dual LED curved projection walls, national leadership plenaries, and 5G policy announcements.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "student-robotics-expo",
    title: "Student Robotics & Autonomous Testbed",
    tag: "Expo Floor",
    location: "Innovation Pavilion Hall 2",
    metric: "120+ Working Prototypes",
    caption:
      "Undergraduate and postgraduate engineering teams demonstrating live autonomous rovers, robotic arms, and industrial sensor networks to visiting delegates.",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hackathon-arena",
    title: "24-Hour NAVONMESH Hackathon Arena",
    tag: "Student Hackathon",
    location: "Koushalam Center of Excellence",
    metric: "500+ Finalist Coders",
    caption:
      "Intensive sprint where student developers and hardware engineers prototype 5G network slices and industrial IoT solutions under mentorship from BSNL engineers.",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "plenary-panels",
    title: "Frontier Tech & Industry 4.0 Plenary Sessions",
    tag: "Leadership Panels",
    location: "Auditorium Hall A",
    metric: "50+ Industry Keynotes",
    caption:
      "Distinguished panel discussions bringing together telecom executives, university vice-chancellors, venture funds, and PSU policymakers.",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "innovation-prototypes",
    title: "Pan-India Academic Research & Startups Showcase",
    tag: "Research & IPR",
    location: "Conclave Exhibition Concourse",
    metric: "10 Pavilions Open Daily",
    caption:
      "Vibrant exhibition floor where researchers, faculty, and early-stage founders present patents, health-tech diagnostic devices, and renewable energy models.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
];

export function ConclaveEventScroll() {
  const [selectedPhoto, setSelectedPhoto] = useState<ConclavePhoto | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 1.0; // pixels per frame

    const step = () => {
      if (!isPaused && el) {
        el.scrollLeft += speed;
        // When scrolled half-way (through first set of duplicated photos), reset smoothly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Duplicated list for seamless infinite autoscroll
  const displayedPhotos = [...CONCLAVE_PHOTOS, ...CONCLAVE_PHOTOS];

  return (
    <section className="relative isolate overflow-hidden border-b border-night-foreground/10 bg-night-deep/90 py-12">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/40 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-tech/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header with Title & Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-tech/30 bg-tech/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-tech">
              <Camera className="size-3.5 text-signal" />
              <span>Conclave Atmosphere & Venue Halls</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Inside Navonmesh Summit 2026
            </h2>
            <p className="mt-1 text-sm text-night-foreground/65">
              Auditoriums, student hackathon arenas, and exhibition pavilions across CMR Medchal campus
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1.5 rounded-full border border-night-foreground/20 bg-night/80 px-3 py-1.5 text-xs font-medium text-night-foreground/80 backdrop-blur-sm transition-colors hover:border-tech hover:text-white"
              aria-label={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <>
                  <Play className="size-3 text-signal" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="size-3 text-tech" />
                  <span>Pause</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleManualScroll("left")}
                className="grid size-8 place-items-center rounded-full border border-night-foreground/20 bg-night/80 text-night-foreground/70 transition-colors hover:border-tech hover:text-white"
                aria-label="Scroll left"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll("right")}
                className="grid size-8 place-items-center rounded-full border border-night-foreground/20 bg-night/80 text-night-foreground/70 transition-colors hover:border-tech hover:text-white"
                aria-label="Scroll right"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-scrolling horizontal ribbon */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="no-scrollbar mt-7 flex gap-5 overflow-x-auto px-5 sm:px-8 py-2 cursor-grab active:cursor-grabbing"
      >
        {displayedPhotos.map((photo, index) => (
          <article
            key={`${photo.id}-${index}`}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative flex-shrink-0 w-[300px] sm:w-[380px] overflow-hidden rounded-2xl border border-night-foreground/15 bg-night p-3 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-tech/60 hover:shadow-tech/20 cursor-pointer"
          >
            {/* Image Box */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-night-surface">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {photo.tag}
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="grid size-7 place-items-center rounded-full bg-tech/90 text-night shadow-md backdrop-blur-sm">
                  <Maximize2 className="size-3.5" />
                </span>
              </div>

              {/* Metric Tag */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-tech text-[11px] drop-shadow">
                  {photo.location}
                </span>
                <span className="rounded-full bg-signal/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  {photo.metric}
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="mt-3 px-1">
              <h3 className="font-display text-base font-semibold text-white line-clamp-1 group-hover:text-tech transition-colors">
                {photo.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-night-foreground/65 line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox / Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        {selectedPhoto && (
          <DialogContent className="max-w-3xl border-night-foreground/20 bg-night-deep text-white sm:rounded-2xl overflow-hidden p-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-tech/40 bg-tech/20 px-3 py-0.5 text-xs font-semibold text-tech">
                    {selectedPhoto.tag}
                  </span>
                  <span className="rounded-full border border-signal/40 bg-signal/20 px-3 py-0.5 text-xs font-semibold text-signal">
                    {selectedPhoto.metric}
                  </span>
                  <span className="text-xs text-night-foreground/60">
                    {selectedPhoto.location}
                  </span>
                </div>
                <DialogTitle className="mt-3 font-display text-2xl font-bold text-white">
                  {selectedPhoto.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm leading-relaxed text-night-foreground/80">
                  {selectedPhoto.caption}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-night-foreground/15 pt-4 text-xs text-night-foreground/60">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4 text-tech" />
                  <span>Open to registered students, faculty & industry delegates</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-signal font-semibold">
                  <Sparkles className="size-3.5" />
                  <span>Live on 29–31 October 2026</span>
                </span>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
