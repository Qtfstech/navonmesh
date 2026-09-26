import { useState, useRef } from "react";
import {
  Cpu,
  Radio,
  Bot,
  BrainCircuit,
  Activity,
  Zap,
  Globe2,
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShieldCheck,
  Building2,
  RadioTower,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Curated high-impact frontier technology & AI images
export interface TechAiItem {
  id: string;
  title: string;
  category: "ai" | "telecom" | "robotics" | "deeptech" | "sustainability";
  categoryLabel: string;
  badge: string;
  partnerTag?: string;
  description: string;
  pavilion: string;
  specs: string[];
  imageUrl: string;
  highlights: string;
}

const TECH_AI_ITEMS: TechAiItem[] = [
  {
    id: "gen-ai-models",
    title: "Sovereign Multimodal AI & Neural Cores",
    category: "ai",
    categoryLabel: "Generative AI",
    badge: "Frontier Lab",
    partnerTag: "CMR Innovation Lab",
    description: "Multilingual foundational models trained on Indic linguistics with low-latency edge deployment for industrial robotics and enterprise automation.",
    pavilion: "Pavilion 06 · IT & Digital Media",
    specs: ["Indic 22-Language Embeddings", "Quantized 4-Bit Edge Execution", "Deterministic Guardrails"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    highlights: "Live inference benchmarks against standard enterprise telemetry with real-time semantic synthesis.",
  },
  {
    id: "bsnl-5g-slicing",
    title: "BSNL 5G Private Network & Edge Slicing",
    category: "telecom",
    categoryLabel: "5G & Telecom",
    badge: "National Core",
    partnerTag: "Presented by BSNL",
    description: "Sub-10ms ultra-reliable low latency communications (URLLC) engineered for mission-critical industrial manufacturing, drone corridors, and emergency health grids.",
    pavilion: "Pavilion 01 · 5G Networks",
    specs: ["Open RAN Architecture", "Dedicated Enterprise Slices", "Bharat 5G Stack"],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    highlights: "Live carrier-grade demonstration showing private campus orchestration and automated radio access recovery.",
  },
  {
    id: "humanoid-robotics",
    title: "Autonomous Collaborative Robotics & Cobots",
    category: "robotics",
    categoryLabel: "Robotics & Automation",
    badge: "Live Prototype",
    partnerTag: "CMR Center of Excellence",
    description: "Multi-axis cybernetic manipulators and vision-guided AGVs executing zero-collision assembly, automated bin picking, and hazardous inspection.",
    pavilion: "Pavilion 04 · Industrial Automation",
    specs: ["Sub-Millimeter Repeatability", "Stereo Spatial Depth SLAM", "Torque Sensor Feedback"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    highlights: "HackFest winner testbeds integrated directly with industrial safety protocols.",
  },
  {
    id: "quantum-computing",
    title: "Quantum Key Distribution & Photonics",
    category: "deeptech",
    categoryLabel: "Deep Tech",
    badge: "National Mission",
    partnerTag: "QTFSF Research Network",
    description: "Unconditional quantum encrypted data links over optical backhauls safeguarding national telecommunications infrastructure against quantum attacks.",
    pavilion: "Pavilion 02 · Telecom Equipment",
    specs: ["Single-Photon Detectors", "Quantum Random Number Gen", "Fiber Polarisation Control"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    highlights: "Real-time key exchange demonstrations over 40km simulated subterranean fiber links.",
  },
  {
    id: "drone-agritech",
    title: "Hyperspectral Agri-Drones & Soil AI",
    category: "sustainability",
    categoryLabel: "AgriTech AI",
    badge: "Field Validated",
    partnerTag: "CMR Agritech Hub",
    description: "Autonomous aerial swarms delivering precision micro-irrigation, early pest detection, and nitrogen mapping for smallholder farming collectives.",
    pavilion: "Pavilion 07 · Agri-Tech Hardware",
    specs: ["Autonomous Waypoint Navigation", "Multispectral NIR Sensors", "Offline Edge Inference"],
    imageUrl: "https://images.unsplash.com/photo-1527018607616-a656a38147e8?auto=format&fit=crop&w=800&q=80",
    highlights: "Hardware built to withstand 48°C ambient heat and monsoon dust conditions.",
  },
  {
    id: "health-ai-diagnostics",
    title: "Biomimetic Point-of-Care Diagnostic Silicon",
    category: "deeptech",
    categoryLabel: "HealthTech AI",
    badge: "MedTech Showcase",
    partnerTag: "Koushalam Initiative",
    description: "Microfluidic chipsets paired with edge deep learning to identify cardiovascular anomalies and infectious pathogens within 90 seconds in rural health posts.",
    pavilion: "Pavilion 08 · Health-Tech Hardware",
    specs: ["Low-Cost Microfluidic Cartridges", "Optical Spectroscopy", "Battery-Powered 12h Run"],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    highlights: "CDSCO pathway compliance documentation and direct clinical testbed datasets.",
  },
  {
    id: "industrial-digital-twin",
    title: "Full-Scale Industrial Digital Twins (Industry 5.0)",
    category: "ai",
    categoryLabel: "Generative AI",
    badge: "Enterprise Scale",
    partnerTag: "Presented by BSNL",
    description: "High-fidelity real-time simulation mirrors of factory floors, power distribution networks, and smart campus grids predicting component failure 72 hours in advance.",
    pavilion: "Pavilion 03 · Industry 4.0 / 5.0",
    specs: ["Unified MQTT/OPC-UA Ingestion", "Physics-Informed Neural Nets", "3D Spatial Dashboard"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    highlights: "Live sensor feeds transmitting via BSNL 5G backhaul to the interactive summit control wall.",
  },
  {
    id: "clean-microgrid-ai",
    title: "Adaptive AI Microgrids & Second-Life Storage",
    category: "sustainability",
    categoryLabel: "Clean Energy",
    badge: "Net-Zero Mission",
    partnerTag: "CMR Green Energy Hub",
    description: "Algorithmic load dispatch balancing rooftop solar arrays, EV fleet bidirectional charging (V2G), and repurposed lithium battery storage banks.",
    pavilion: "Pavilion 09 · Renewable Energy",
    specs: ["Autonomous Islanding Mode", "99.4% Inverter Efficiency", "Dynamic Peak Shaving"],
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    highlights: "Powering part of the live Navonmesh Summit 2026 exhibition pavilion off-grid.",
  },
];

export function TechAiShowcaseScroll() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<TechAiItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "all"
      ? TECH_AI_ITEMS
      : TECH_AI_ITEMS.filter((item) => item.category === activeCategory);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative isolate border-b border-night-foreground/10 bg-night-deep/90 py-16 text-night-foreground overflow-hidden">
      {/* Subtle glowing ambient lighting */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -z-10 size-96 -translate-y-1/2 rounded-full bg-tech/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 -z-10 size-96 -translate-y-1/2 rounded-full bg-signal/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-tech/30 bg-tech/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-tech">
              <Sparkles className="size-3.5 text-signal animate-pulse" />
              <span>Frontier Tech & AI Stream</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
              AI, 5G & Frontier Innovations on Display
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-night-foreground/70 sm:text-base">
              Scroll through the cutting-edge prototypes, neural models, and field-ready technologies showcased by research labs, BSNL, and CMR at Navonmesh 2026.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="grid size-10 place-items-center rounded-full border border-night-foreground/15 bg-night text-night-foreground transition-all hover:border-tech hover:text-tech active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="grid size-10 place-items-center rounded-full border border-night-foreground/15 bg-night text-night-foreground transition-all hover:border-tech hover:text-tech active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-7 flex flex-wrap gap-2 pb-2">
          {[
            { id: "all", label: "All Frontier Tech", icon: Globe2 },
            { id: "ai", label: "Generative AI", icon: BrainCircuit },
            { id: "telecom", label: "5G & Telecom (BSNL)", icon: RadioTower },
            { id: "robotics", label: "Robotics & Automation (CMR)", icon: Bot },
            { id: "deeptech", label: "Deep Tech & Silicon", icon: Cpu },
            { id: "sustainability", label: "Agri & Clean Tech", icon: Zap },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-signal text-paper shadow-md shadow-signal/20 scale-[1.02]"
                    : "border border-night-foreground/15 bg-night/60 text-night-foreground/75 hover:border-tech/40 hover:text-white"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Infinite/Draggable Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="mt-6 flex gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative flex-none w-[310px] sm:w-[350px] snap-start cursor-pointer rounded-2xl border border-night-foreground/15 bg-night/80 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-tech/60 hover:shadow-2xl hover:shadow-tech/10"
            >
              {/* Image Container with Zoom & Cyber Gradient */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-night-deep">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-night/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold tracking-wide text-tech border border-tech/30">
                  <span className="size-1.5 rounded-full bg-signal animate-ping" />
                  <span>{item.badge}</span>
                </div>

                {/* Partner Tag */}
                {item.partnerTag && (
                  <div className="absolute right-3 top-3 rounded-full bg-night/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white/90 border border-white/10">
                    {item.partnerTag}
                  </div>
                )}

                {/* Hover Expand Icon */}
                <div className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-night/80 text-tech opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm border border-tech/40">
                  <Maximize2 className="size-4" />
                </div>
              </div>

              {/* Content Block */}
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-night-foreground/60">
                  <span className="font-semibold text-signal uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <span className="truncate max-w-[170px] text-right text-night-foreground/50">
                    {item.pavilion}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white group-hover:text-tech transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-night-foreground/70">
                  {item.description}
                </p>

                {/* Tech Specs Chips */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {item.specs.slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="rounded bg-night-foreground/5 px-2 py-0.5 text-[11px] font-mono text-night-foreground/75 border border-night-foreground/10"
                    >
                      {spec}
                    </span>
                  ))}
                  {item.specs.length > 2 && (
                    <span className="rounded bg-tech/10 px-1.5 py-0.5 text-[10px] font-mono text-tech">
                      +{item.specs.length - 2} more
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-night-foreground/10 pt-3 text-xs font-semibold text-tech">
                  <span>View Tech Specifications</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="border-tech/30 bg-night text-night-foreground sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-signal/20 px-3 py-1 text-xs font-semibold text-signal border border-signal/30">
                  {selectedItem.categoryLabel}
                </span>
                <span className="rounded-full bg-tech/20 px-3 py-1 text-xs font-medium text-tech border border-tech/30">
                  {selectedItem.badge}
                </span>
                {selectedItem.partnerTag && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                    {selectedItem.partnerTag}
                  </span>
                )}
              </div>
              <DialogTitle className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                {selectedItem.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-night-foreground/70">
                {selectedItem.pavilion}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-night-foreground/15">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="size-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-signal">
                  Technical Architecture & Description
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-night-foreground/90">
                  {selectedItem.description}
                </p>
              </div>

              <div className="rounded-xl border border-tech/20 bg-tech/5 p-4">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-tech">
                  <ShieldCheck className="size-4" />
                  <span>Summit Live Benchmark Highlights</span>
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-night-foreground/80">
                  {selectedItem.highlights}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-night-foreground/60">
                  Core Specifications
                </h4>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedItem.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg border border-night-foreground/10 bg-night-foreground/5 px-3 py-2 text-xs font-mono text-night-foreground/90"
                    >
                      <span className="size-1.5 rounded-full bg-signal" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  asChild
                  className="flex-1 rounded-full bg-signal text-paper hover:bg-signal/90 font-medium"
                >
                  <a href="/register" onClick={() => setSelectedItem(null)}>
                    Register to Experience Live
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 rounded-full border-night-foreground/20 text-night-foreground hover:bg-night-foreground/10"
                >
                  <a href="#technologies" onClick={() => setSelectedItem(null)}>
                    View All 10 Pavilions
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
