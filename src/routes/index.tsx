import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  Bot,
  Boxes,
  CalendarDays,
  CircuitBoard,
  CloudCog,
  Factory,
  GraduationCap,
  Handshake,
  HeartPulse,
  Lightbulb,
  MapPin,
  MousePointerClick,
  Menu,
  Network,
  RadioTower,
  Recycle,
  Rocket,
  Satellite,
  Sprout,
  Users,
  Wifi,
  Wind,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechBackgroundCanvas } from "@/components/tech-3d/TechBackgroundCanvas";
import { ConclaveEventScroll } from "@/components/conclave-gallery/ConclaveEventScroll";
import { CountdownTimer } from "@/components/hero/CountdownTimer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OrganizationRegistrationForm } from "@/components/registration/organization-registration-form";
import { NavonmeshBrandGraphic } from "@/components/brand/NavonmeshBrandGraphic";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ChatWidget } from "@/components/chatbot/chat-widget";
import { SubmissionFormDialog } from "@/components/registration/submission-form-dialog";
import { submissionForms } from "@/data/submission-forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import stageImage from "@/assets/navonmesh-clay-stage.png";
import bsnlLogo from "@/assets/partners/bsnl-logo.png";
import qtfsfLogo from "@/assets/partners/qtfsf-logo.png";
import cmrLogo from "@/assets/partners/cmr-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Navonmesh Summit 2026 | National Tech Conclave" },
      {
        name: "description",
        content:
          "Explore Navonmesh Summit 2026, India's national research, innovation, startup and academia conclave in Hyderabad, 29–31 October.",
      },
      { property: "og:title", content: "Navonmesh Summit 2026 | National Tech Conclave" },
      {
        property: "og:description",
        content:
          "Three days of 5G, Industry 4.0, innovation, startup collaboration and live technology at CMR Medchal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Technology = {
  number: string;
  title: string;
  label: string;
  description: string;
  detail: string;
  image: string;
  icon: LucideIcon;
  tags: string[];
};

const technologies: Technology[] = [
  {
    number: "01",
    title: "5G & Next-Gen Networks",
    label: "Connect",
    description: "A national platform aligned with India’s 5G mission and the next generation of connected enterprise systems.",
    detail:
      "This pavilion tracks India's 5G rollout from spectrum to service — network slicing, edge compute, private 5G for campuses and factories, and the applications it unlocks for enterprise, defence and public infrastructure. Expect live demos of low-latency use cases, briefings from telecom operators and policy updates on the national 5G roadmap.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    icon: RadioTower,
    tags: ["5G vision", "Networks", "Connected systems"],
  },
  {
    number: "02",
    title: "Telecom & Optical Equipment",
    label: "Connect",
    description: "Telecom equipment, network infrastructure and live technology demonstrations built for real-world deployment.",
    detail:
      "From base stations and fiber backhaul to routers and network testbeds — this track is where equipment makers and system integrators show hardware that's actually shipping. It's built for procurement teams, telecom engineers and BSNL's System Integrator partners scouting field-ready gear, not just concept demos.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    icon: Satellite,
    tags: ["Equipment", "Infrastructure", "Testbeds"],
  },
  {
    number: "03",
    title: "Industry 4.0 / 5.0",
    label: "Make",
    description: "Future-ready manufacturing that moves from rapid technological disruption to scalable enterprise solutions.",
    detail:
      "Digital twins, connected shop floors, predictive maintenance and the shift from Industry 4.0's automation focus toward 5.0's human-centric, resilient factories. Manufacturers and OEMs share how they're modernizing legacy lines without ripping and replacing everything at once.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    icon: Factory,
    tags: ["Smart factory", "Digital twins", "Future industry"],
  },
  {
    number: "04",
    title: "Industrial Automation & Robotics",
    label: "Make",
    description: "Prototype models and end-to-end automation ideas developed through workshops, live testbeds and the hackathon.",
    detail:
      "Robotics arms, AGVs, PLC-driven process automation and vision-based quality control — presented as working prototypes, not slideware. This is also the direct pipeline into the NAVONMESH Hackathon 2026, where student and startup teams build automation concepts through to a live testbed demo.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    icon: Bot,
    tags: ["Robotics", "Automation", "Prototypes"],
  },
  {
    number: "05",
    title: "Electrical & Electronics Hardware",
    label: "Make",
    description: "Engineering hardware and electronic systems connecting research, manufacturing and commercialization pathways.",
    detail:
      "PCB design, embedded systems, power electronics and component sourcing — the engineering layer underneath almost every other pavilion. Hardware founders and R&D teams get face time with contract manufacturers, component distributors and testing labs that can take a working prototype to production volume.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    icon: CircuitBoard,
    tags: ["Hardware", "Electronics", "Engineering"],
  },
  {
    number: "06",
    title: "IT, ITeS & Digital Media",
    label: "Connect",
    description: "Digital services and media systems supporting modern enterprises, collaboration and knowledge exchange.",
    detail:
      "Enterprise software, cloud platforms, AI-driven services and digital media production — the IT/ITeS layer that connects every other sector to its customers and back office. Includes sessions on outsourcing partnerships, SaaS go-to-market in India, and the media/content workflows powering modern brands.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    icon: CloudCog,
    tags: ["IT services", "Digital media", "Enterprise"],
  },
  {
    number: "07",
    title: "Agri-tech Hardware",
    label: "Make",
    description: "Technology-led hardware concepts designed to move practical agricultural innovation closer to the field.",
    detail:
      "Soil and crop sensors, drone-based monitoring, irrigation automation and low-cost farm hardware built for Indian field conditions — not lab conditions. Innovators here are judged on whether a smallholder farmer could actually deploy and maintain the device, not just on the concept.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    icon: Sprout,
    tags: ["Field systems", "Sensors", "Applied research"],
  },
  {
    number: "08",
    title: "Health-tech Hardware",
    label: "Make",
    description: "Engineering and prototype pathways for accessible, practical and commercially viable healthcare technology.",
    detail:
      "Diagnostic devices, wearables, telemedicine hardware and assistive technology aimed at India's cost and access constraints. Expect regulatory-pathway guidance (CDSCO, ISO 13485) alongside the engineering demos, since getting a device to market is as much a compliance challenge as a technical one.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    icon: HeartPulse,
    tags: ["Diagnostics", "Devices", "Healthcare"],
  },
  {
    number: "09",
    title: "Renewable Energy & Smart Grid",
    label: "Sustain",
    description: "Emerging clean-energy ideas shaped through sustainability, enterprise collaboration and future strategy.",
    detail:
      "Solar, wind, storage and grid-integration technology aligned with India's clean-energy targets, plus the enterprise and PSU partnerships that turn a pilot project into a funded rollout. Sessions cover both the hardware and the policy/incentive landscape founders need to navigate.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    icon: Wind,
    tags: ["Clean energy", "Sustainability", "Scale"],
  },
  {
    number: "10",
    title: "Circular Economy & Clean Tech",
    label: "Sustain",
    description: "Environmental services, circular systems and waste-management innovation for responsible growth.",
    detail:
      "Waste-to-resource systems, recycling technology, EPR compliance services and circular supply-chain models — the sector working to decouple industrial growth from landfill. A strong fit for founders and enterprises building environmental compliance or resource-recovery products.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    icon: Recycle,
    tags: ["Circularity", "Waste", "Environment"],
  },
];

type Format = {
  code: string;
  title: string;
  description: string;
  detail: string;
};

const formats: Format[] = [
  {
    code: "Expo",
    title: "Pan-India Innovation Expo",
    description: "Research, startup products and working prototypes from innovators across India.",
    detail:
      "A curated exhibition floor spanning all ten technology pavilions, open across the full three days. Exhibitors get a booth, delegate footfall and a listing in the expo directory; visitors get a single walkthrough of India's innovation pipeline from lab to product.",
  },
  {
    code: "MoU",
    title: "MoU Signing Hub",
    description: "Formal partnerships across startups, enterprises and academic institutions.",
    detail:
      "A dedicated space and process for formalizing partnerships on-site — startup-enterprise pilots, academia-industry research tie-ups and government-backed collaboration agreements, including the BSNL System Integrator pathway for hackathon winners.",
  },
  {
    code: "Panels",
    title: "Roundtable & Plenary",
    description: "Policymakers, industry stalwarts and R&D leaders in high-impact sessions.",
    detail:
      "Moderated discussions and keynotes on the policy and strategy questions shaping each sector — 5G rollout, manufacturing competitiveness, clean-energy incentives — with speakers from government, industry and research institutions.",
  },
  {
    code: "Funding",
    title: "Investor Pitch & Mentorship",
    description: "Founder access to VCs, angel networks and PSU incubation funds.",
    detail:
      "Structured pitch sessions in front of VCs, angel investors and PSU incubation programs, paired with mentorship slots so founders leave with concrete feedback and warm introductions, not just a business card.",
  },
  {
    code: "Students",
    title: "Student Immersion Tracks",
    description: "Exposure modules for diploma, undergraduate and postgraduate scholars.",
    detail:
      "Guided walkthroughs of the expo and pavilions designed for students, plus workshops on emerging technology domains. It's the on-ramp for the hackathon and prototype-pitch tracks — come to learn, leave with a team and an idea.",
  },
  {
    code: "Hackathon",
    title: "NAVONMESH HACKATHON 2026",
    description: "Emerging-domain prototypes for end-to-end industry automation.",
    detail:
      "A competitive build track across the summit's focus sectors. Winning teams are eligible to sign an MoU with BSNL to work as System Integrators — a direct bridge from a weekend prototype to real deployment. Entry fee ₹500 per participant.",
  },
];

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#technologies", label: "Technologies" },
  { href: "#get-involved", label: "Participate Hackathon", pointsAtHackathon: true },
  { href: "#get-involved", label: "Attend" },
  { href: "#register", label: "Register" },
];

function Index() {
  const [pointingAtHackathon, setPointingAtHackathon] = useState(false);
  const [show3DBackdrop, setShow3DBackdrop] = useState(true);

  // "Participate Hackathon" scrolls to Navonmesh Hackathon 2026 in Get Involved and highlights it.
  function pointAtHackathon(event?: MouseEvent<HTMLAnchorElement>) {
    if (event) event.preventDefault();
    window.setTimeout(() => {
      const hackathonEl = document.getElementById("get-involved-hackathon");
      if (hackathonEl) {
        hackathonEl.scrollIntoView({ behavior: "smooth", block: "center" });
        setPointingAtHackathon(true);
        window.setTimeout(() => setPointingAtHackathon(false), 5000);
      } else {
        document
          .getElementById("get-involved")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-night text-night-foreground">
      <header className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center" aria-label="Navonmesh home">
          <img
            src="/navonmesh-logo.jpeg"
            alt="Navonmesh — Ideas, Innovation, Impact"
            className="h-12 w-auto rounded-lg bg-white object-contain shadow-night sm:h-14"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={link.pointsAtHackathon ? pointAtHackathon : undefined}
              className="text-sm font-medium text-night-foreground/70 transition-colors hover:text-tech"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* 3D Horizon Ambience Toggle */}
          <button
            type="button"
            onClick={() => setShow3DBackdrop((prev) => !prev)}
            className="group relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-night-deep/80 px-2.5 py-1.5 text-xs font-medium text-night-foreground/80 hover:border-tech/50 hover:text-tech transition-all"
            title={show3DBackdrop ? "3D Background Active (Click for pure clean background)" : "3D Background Paused (Click to restore 3D horizon)"}
            aria-label={show3DBackdrop ? "Disable 3D background effects" : "Enable 3D background effects"}
          >
            <span className={`size-1.5 rounded-full transition-colors ${show3DBackdrop ? "bg-tech shadow-[0_0_8px_#38bdf8]" : "bg-white/30"}`} />
            <span className="hidden md:inline-block font-mono text-[11px] font-semibold">
              {show3DBackdrop ? "3D FX: On" : "3D FX: Off"}
            </span>
          </button>

          <Button asChild className="hidden rounded-full bg-signal text-paper hover:bg-signal/90 sm:inline-flex">
            <a href="#register">Register now</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-night-foreground hover:bg-night-foreground/10 hover:text-night-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-night-foreground/10 bg-night text-night-foreground flex flex-col justify-between">
              <div>
                <SheetHeader>
                  <SheetTitle className="font-display text-night-foreground">Navonmesh Summit</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 grid gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        onClick={link.pointsAtHackathon ? pointAtHackathon : undefined}
                        className="rounded-md px-3 py-3 text-base font-medium text-night-foreground/80 transition-colors hover:bg-night-foreground/10 hover:text-tech"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </div>

              <div className="mt-auto space-y-3 pt-6 border-t border-night-foreground/10">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono text-night-foreground/70">Theme Mode</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono text-night-foreground/70">3D Background</span>
                  <button
                    type="button"
                    onClick={() => setShow3DBackdrop((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-night-deep/80 px-2.5 py-1 text-xs font-medium text-night-foreground/80 hover:border-tech/50 hover:text-tech transition-all"
                  >
                    <span className={`size-1.5 rounded-full ${show3DBackdrop ? "bg-tech" : "bg-white/30"}`} />
                    <span className="font-mono text-[11px]">{show3DBackdrop ? "Active" : "Disabled"}</span>
                  </button>
                </div>
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-full bg-signal text-paper hover:bg-signal/90">
                    <a href="#register">Register now</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="top" className="relative isolate overflow-hidden border-b border-night-foreground/10 pt-16 sm:pt-20">
        {/* Interactive 3D Quantum Core & Orbiting Tech Spheres */}
        {show3DBackdrop && (
          <div className="pointer-events-none absolute inset-0 -z-10">
            <TechBackgroundCanvas variant="hero-quantum" intensity="vibrant" />
          </div>
        )}

        {/* Ambient Stage & Vignette Atmosphere */}
        <div className="absolute inset-0 -z-20">
          <img
            src={stageImage}
            width={1088}
            height={1200}
            alt="Technology summit stage featuring telecom, research, robotics and innovation exhibits"
            className="size-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-deep/80 via-night/65 to-night-deep" />
        </div>
        <div className="tech-grid absolute inset-0 -z-10 opacity-15" />

        {/* Floating Cyber Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-tech/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -left-32 -z-10 size-80 rounded-full bg-signal/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 size-80 rounded-full bg-[#10b981]/10 blur-3xl" />

        <div className="mx-auto flex min-h-[calc(100svh-4rem)] lg:h-[calc(100svh-4rem)] max-w-7xl flex-col items-center justify-between px-4 py-2 sm:py-3 text-center sm:px-8">
          {/* Enhanced & Enlarged Partner Showcase (BSNL, CMR, QTFSF) */}
          <div className="grid w-full grid-cols-3 items-center gap-3 sm:gap-6 max-w-4xl">
            <PartnerLogo
              src={qtfsfLogo}
              alt="Quality Thought Future Skills Foundation"
              role="Organized by"
              caption="QT Future Skills Foundation"
              align="start"
              variant="default"
              delay="0s"
            />
            <PartnerLogo
              src={bsnlLogo}
              alt="BSNL — Connecting Bharat"
              role="Presented by BSNL"
              caption="National 5G & Telecom Partner"
              align="center"
              variant="bsnl"
              delay="0.2s"
            />
            <PartnerLogo
              src={cmrLogo}
              alt="CMR Group of Institutions"
              role="Host & Knowledge Partner"
              caption="CMR Campus, Hyderabad"
              align="end"
              variant="cmr"
              delay="0.4s"
            />
          </div>

          {/* Completely Redesigned High-Impact NAVONMESH Brand Graphic Centerpiece */}
          <div className="my-auto flex flex-col items-center justify-center py-1 sm:py-2 w-full max-w-4xl">
            <NavonmeshBrandGraphic />

            {/* The Tri-Pillars of the Summit */}
            <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase">
              <span className="rounded-full border border-tech/30 bg-tech/10 px-3 py-0.5 text-white backdrop-blur-sm">
                Awards
              </span>
              <span className="text-night-foreground/30 font-bold">·</span>
              <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-0.5 text-signal backdrop-blur-sm">
                Expo
              </span>
              <span className="text-night-foreground/30 font-bold">·</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-950/40 px-3 py-0.5 text-emerald-300 backdrop-blur-sm">
                Conclave
              </span>
            </div>

            {/* Official Summit Subtitle */}
            <p className="mt-2 max-w-xl text-balance text-xs font-medium text-night-foreground/75 sm:text-sm leading-tight text-center">
              National Research, Innovation, Startup & Academia Conclave
            </p>

            {/* Theme Quote with Cyber Glass Frame */}
            <div className="mt-2 rounded-full border border-tech/25 bg-night/60 px-4 py-0.5 backdrop-blur-md">
              <p className="font-display text-xs font-medium text-white/90 sm:text-sm tracking-wide">
                “Catalysing India’s 5G Vision, Industry 4.0 & Beyond”
              </p>
            </div>
          </div>

          {/* Unified Bottom Console: Date, Venue, Countdown & Actions (Guaranteed Above the Fold) */}
          <div className="flex flex-col items-center w-full gap-2 sm:gap-3 mt-auto pb-1 sm:pb-2">
            {/* Enhanced Conclave Telemetry Bar: Date, Venue & Live Countdown */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-night-foreground/80 max-w-5xl">
              {/* Enhanced Summit Dates Badge */}
              <div className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-tech/40 bg-gradient-to-b from-night-surface/90 to-night-deep/95 px-3 sm:px-3.5 py-1.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(56,189,248,0.18)] ring-1 ring-white/10 hover:border-tech/80 transition-all group">
                <div className="flex items-center gap-1.5 border-r border-white/15 pr-2.5">
                  <div className="grid size-6 place-items-center rounded-lg bg-tech/20 border border-tech/40 text-tech">
                    <CalendarDays className="size-3.5 text-tech" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-tech">
                      SUMMIT DATES
                    </span>
                    <span className="text-[10px] font-medium text-night-foreground/60 hidden sm:inline">
                      3-Day Conclave
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="font-display text-xs sm:text-sm font-black text-white tracking-wide">
                    29–31 OCT 2026
                  </span>
                  <span className="rounded-full bg-tech/20 border border-tech/30 px-1.5 py-0.5 text-[9px] font-mono font-bold text-tech">
                    THU–SAT
                  </span>
                </div>
              </div>

              {/* Enhanced Summit Venue & Location Badge */}
              <div className="inline-flex items-center gap-2 rounded-xl sm:rounded-2xl border border-emerald-400/40 bg-gradient-to-b from-night-surface/90 to-night-deep/95 px-3 sm:px-3.5 py-1.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(16,185,129,0.18)] ring-1 ring-white/10 hover:border-emerald-400/80 transition-all group">
                <div className="flex items-center gap-1.5 border-r border-white/15 pr-2.5">
                  <div className="grid size-6 place-items-center rounded-lg bg-emerald-400/20 border border-emerald-400/40 text-emerald-300">
                    <MapPin className="size-3.5 text-emerald-400 animate-bounce [animation-duration:2.5s]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                      HOST VENUE
                    </span>
                    <span className="text-[10px] font-medium text-night-foreground/60 hidden sm:inline">
                      Telangana, India
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-display text-xs sm:text-sm font-black text-white tracking-wide">
                    CMR Campus
                  </span>
                  <span className="text-night-foreground/40 font-bold">·</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-300">
                    Hyderabad
                  </span>
                </div>
              </div>

              {/* Enhanced Live Countdown Timer */}
              <CountdownTimer compact />
            </div>

            {/* Interactive Hero Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <Button
                asChild
                size="default"
                className="rounded-full bg-signal px-7 py-2.5 text-sm sm:text-base font-bold text-paper shadow-xl shadow-signal/40 hover:bg-signal/90 hover:scale-105 transition-all ring-2 ring-signal/50"
              >
                <a href="#register">
                  <span>Register for Summit</span>
                  <ChevronRight className="size-4 ml-1" />
                </a>
              </Button>

              <Button
                asChild
                size="default"
                variant="outline"
                className="rounded-full border-tech/50 bg-night-deep/80 px-5 text-sm sm:text-base text-white backdrop-blur-sm hover:bg-tech/20 hover:border-tech hover:scale-105 transition-all"
              >
                <a href="#technologies">
                  <span>Explore 10 Pavilions</span>
                </a>
              </Button>

              <a
                href="#get-involved"
                onClick={pointAtHackathon}
                className="group inline-flex items-center gap-1.5 rounded-full border border-signal/50 bg-signal/15 px-3.5 py-1.5 text-xs font-bold text-signal backdrop-blur-sm transition-all hover:bg-signal/25 hover:border-signal shadow-sm"
              >
                <Sparkles className="size-3.5 animate-pulse" />
                <span>BSNL SI Hackathon</span>
                <span className="rounded-full bg-signal px-1.5 py-0.5 text-[10px] text-paper font-black">MoU Ready</span>
              </a>
            </div>

            {/* Subtle Scroll Down Prompt */}
            <a
              href="#conclave-gallery"
              aria-label="Scroll down to Conclave and Student Tech Event gallery"
              className="mt-1 hidden lg:grid size-7 place-items-center rounded-full border border-night-foreground/20 text-tech/60 transition-all hover:border-tech hover:text-tech hover:scale-110"
            >
              <ArrowDown className="size-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Conclave Halls & Student Tech Event Auto-Scrolling Photo Gallery (Directly after first page) */}
      <div id="conclave-gallery">
        <ConclaveEventScroll />
      </div>

      <section id="overview" className="relative isolate overflow-hidden border-b border-night-foreground/10 bg-night-deep">
        {/* Interactive 3D Torus Knot & Holographic Network Background */}
        <TechBackgroundCanvas variant="overview-torus" intensity="subtle" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 relative z-10">
          <SectionIntro eyebrow="Event intelligence" title="The summit, mapped at a glance." text="Every figure below comes directly from the event brief—an information map of the people, sectors and experiences converging in Hyderabad." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-night-foreground/10 bg-night-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              icon={CalendarDays}
              value="03"
              label="Days"
              detail="Conclave + live exhibition"
              more="29–31 October 2026 at the CMR Group of Institutions campus in Medchal, Hyderabad. Day one opens with plenaries and the expo floor; the hackathon and MoU signings run across all three days, closing with awards and the investor pitch showcase."
            />
            <Stat
              icon={Network}
              value="04"
              label="Focus sectors"
              detail="Make · Connect · Sustain · Collaborate"
              more="Make covers manufacturing, automation, hardware and health-tech. Connect spans 5G, telecom and digital services. Sustain covers renewable energy and circular economy. Collaborate is the cross-cutting layer — MoUs, funding and student tracks that tie the other three together."
            />
            <Stat
              icon={Boxes}
              value="06"
              label="Event formats"
              detail="From expo floor to funding rooms"
              more="Expo, MoU Signing Hub, Roundtable & Plenary, Investor Pitch & Mentorship, Student Immersion Tracks, and the NAVONMESH Hackathon — six distinct ways to engage, running in parallel across the three days. See the 'Six ways to participate' section below for details on each."
            />
            <Stat
              icon={Users}
              value="09"
              label="Audience groups"
              detail="Research, enterprise, capital and policy"
              more="Researchers and faculty, startup founders, students, VCs and angel investors, telecom and enterprise leaders, government agencies and PSUs, educational institutions, startup support entities and IPR entities — nine groups sharing one floor."
            />
          </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-4">
            <JourneyStep icon={Lightbulb} number="01" title="Think" text="Spot disruption and build future-proof solutions." />
            <JourneyStep icon={Bot} number="02" title="Prototype" text="Learn through workshops, models and live testbeds." />
            <JourneyStep icon={Handshake} number="03" title="Connect" text="Meet industry, academia, government and investors." />
            <JourneyStep icon={Rocket} number="04" title="Scale" text="Move research toward funding and commercialization." last />
          </div>
        </div>
      </section>

      <section id="technologies" className="relative isolate overflow-hidden bg-night py-24">
        {/* Interactive 3D Geodesic Matrix & Nodes Background */}
        <TechBackgroundCanvas variant="pavilion-matrix" intensity="subtle" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <SectionIntro eyebrow="Technology pavilions" title="Every domain has its own stage." text="A visual field guide to the technologies explicitly shaping the summit’s Make, Connect and Sustain sectors." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {technologies.map((technology) => <TechnologyCard key={technology.number} technology={technology} />)}
          </div>
        </div>
      </section>

      <section id="participate" className="relative isolate overflow-hidden bg-paper py-24 text-navy">
        {/* Interactive 3D Geometrical Crystals Background */}
        <TechBackgroundCanvas variant="participate-grid" intensity="subtle" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <SectionIntro light eyebrow="Six ways to participate" title="A conclave designed for action." text="The three-day format connects live discovery, practical learning, partnership building and routes to investment." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-navy/10 bg-navy/10 md:grid-cols-2 lg:grid-cols-3">
            {formats.map((format, index) => (
              <Dialog key={format.code}>
                <DialogTrigger asChild>
                  <article
                    id={format.code === "Hackathon" ? "hackathon-card" : undefined}
                    className={`relative cursor-pointer bg-paper p-7 text-left transition-colors hover:bg-mint/20 ${
                      format.code === "Hackathon" && pointingAtHackathon
                        ? "z-10 bg-mint/30 ring-4 ring-inset ring-signal"
                        : ""
                    }`}
                  >
                    {format.code === "Hackathon" && pointingAtHackathon && (
                      <span className="absolute right-4 top-3 flex animate-bounce items-center gap-1.5 rounded-full bg-signal px-3 py-1 text-xs font-bold uppercase tracking-wide text-paper shadow-signal">
                        <MousePointerClick className="size-3.5" />
                        Student hackathon
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-sm font-bold text-signal">0{index + 1}</span>
                      <span className="rounded-full border border-navy/10 px-3 py-1 text-xs font-semibold uppercase text-navy/60">{format.code}</span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-semibold">{format.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/65">{format.description}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[.12em] text-signal">Read more →</p>
                  </article>
                </DialogTrigger>
                <DialogContent className="bg-paper text-navy sm:max-w-lg">
                  <DialogHeader>
                    <span className="text-xs font-bold uppercase tracking-[.18em] text-signal">{format.code}</span>
                    <DialogTitle className="font-display text-2xl">{format.title}</DialogTitle>
                    <DialogDescription className="text-navy/65">{format.description}</DialogDescription>
                  </DialogHeader>
                  <p className="text-sm leading-relaxed text-navy/75">{format.detail}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-deep py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-tech">Highlighted pathway</p>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold sm:text-5xl">From hackathon prototype to BSNL System Integrator opportunity.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-night-foreground/65">Hackathon 2026 winners are eligible to sign an MoU with BSNL to work as System Integrators—a direct bridge from hands-on innovation to enterprise deployment.</p>
            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-lg bg-night-foreground/10 text-center">
              {[["01", "Build"], ["02", "Demonstrate"], ["03", "Integrate"]].map((item) => (
                <div key={item[0]} className="bg-night p-5"><p className="font-display text-2xl text-signal">{item[0]}</p><p className="mt-1 text-xs uppercase tracking-[.12em] text-night-foreground/60">{item[1]}</p></div>
              ))}
            </div>
          </div>
          <div className="relative isolate overflow-hidden rounded-2xl border border-tech/30 bg-night p-3 shadow-2xl shadow-tech/10">
            {/* Tech Image representing System Integration, 5G Telecom Network & Student Engineering */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-night-surface">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
                loading="lazy"
                referrerPolicy="no-referrer"
                alt="Cybernetic digital architecture representing the BSNL System Integrator MoU pathway"
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night/30 to-transparent" />

              {/* High-tech telemetry badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-tech/40 bg-night/85 px-3 py-1 text-[11px] font-semibold text-tech backdrop-blur-md">
                  <Network className="size-3.5 text-signal" />
                  <span>BSNL Enterprise SI Hub</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/85 px-2.5 py-1 text-[10px] font-bold text-emerald-300 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>MoU Ready</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-night/90 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-night-foreground/80">
                  <span className="font-semibold text-white">Pathway Architecture</span>
                  <span className="text-tech font-mono">Stage 03: Deployment</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-night-foreground/20 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-signal via-tech to-emerald-400" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-signal">Direct SI</span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-night-foreground/75">
                  Winners transition directly into BSNL-verified System Integrator partners for Pan-India telecom testbed deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="attend" className="bg-mint py-24 text-navy">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-navy/60">Who should attend</p>
              <h2 className="mt-4 text-balance font-display text-4xl font-semibold sm:text-5xl">One national room. Nine perspectives.</h2>
              <p className="mt-5 max-w-xl text-navy/65">Researchers, founders, students, capital, enterprise and public institutions meet around a shared path from idea to impact.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Researchers, PhD scholars & faculty", "Startup founders", "Technical & management students", "VCs, angels & seed funds", "Telecom, automation & enterprise leaders", "Government agencies, PSUs & policymakers", "Pan-India educational institutions", "Startup support entities", "IPR entities"].map((audience, index) => (
                <div key={audience} className="flex items-center gap-4 border-b border-navy/15 py-4">
                  <span className="font-display text-sm text-signal">0{index + 1}</span>
                  <p className="font-display font-semibold">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="get-involved" className="bg-night py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionIntro
            eyebrow="Get involved"
            title="Take the stage, the floor or the podium."
            text="Pitch an idea, speak, exhibit, nominate for an award or join the Navonmesh Hackathon 2026. Each opens a short form — no account needed."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {submissionForms.map((form, index) => {
              const Icon = form.icon;
              const isHackathon = form.slug === "hackathon";
              return (
                <SubmissionFormDialog key={form.slug} form={form}>
                  <button
                    type="button"
                    id={isHackathon ? "get-involved-hackathon" : undefined}
                    className={`group relative flex flex-col rounded-xl border p-7 text-left transition-all duration-300 hover:-translate-y-1 ${
                      isHackathon && pointingAtHackathon
                        ? "border-signal bg-night-surface ring-4 ring-signal/70 shadow-[0_0_35px_rgba(255,107,0,0.5)] z-10 scale-[1.02]"
                        : "border-night-foreground/10 bg-night-surface hover:border-tech/50"
                    } ${index >= 3 ? "lg:col-span-3" : "lg:col-span-2"}`}
                  >
                    {isHackathon && pointingAtHackathon && (
                      <span className="absolute -top-3.5 right-4 flex animate-bounce items-center gap-1.5 rounded-full bg-signal px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-paper shadow-lg shadow-signal/40">
                        <Sparkles className="size-3.5" />
                        Navonmesh Hackathon 2026
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-4">
                      <span className={`grid size-12 place-items-center rounded-lg border ${
                        isHackathon ? "border-signal/40 bg-signal/15 text-signal" : "border-tech/30 bg-night/70 text-tech"
                      }`}>
                        <Icon className="size-6" strokeWidth={1.5} />
                      </span>
                      <span className="rounded-full border border-night-foreground/15 px-3 py-1 text-xs font-semibold uppercase text-night-foreground/60">
                        {form.audience}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-semibold">{form.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-night-foreground/60">{form.summary}</p>
                    <span className={`mt-6 text-xs font-semibold uppercase tracking-[.12em] ${isHackathon ? "text-signal" : "text-tech"}`}>
                      Open form <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </button>
                </SubmissionFormDialog>
              );
            })}
          </div>
        </div>
      </section>

      <section id="register" className="relative isolate overflow-hidden bg-night-deep py-24">
        {/* Interactive 3D Portal Ring Background */}
        <TechBackgroundCanvas variant="registration-portal" intensity="subtle" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <SectionIntro
            eyebrow="Registration"
            title="Register your organization for Navonmesh 2026."
            text="Bring your enterprise, startup, academic institution, or research delegation to participate in the expo floor, sponsor the conclave, or nominate for national awards."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="grid gap-4">
              {[
                ["01", "Tell us about your organization", "Share your organization profile, sector, and delegate details."],
                ["02", "We match you to the right track", "Expo pavilion booth, strategic partnership, sponsorship, or award nomination."],
                ["03", "Confirm & arrive", "Receive official credentials and passes ahead of 29 October 2026."],
              ].map((step) => (
                <div key={step[0]} className="rounded-lg border border-night-foreground/10 bg-night p-6">
                  <span className="font-display text-sm text-signal">{step[0]}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{step[1]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-night-foreground/55">{step[2]}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-tech/30 bg-night/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-tech/10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-night-foreground/10 pb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">Organization Registration</h3>
                  <p className="text-xs text-night-foreground/65 mt-1">Enterprise Delegates · Exhibitors · Academic Institutions · Industry Partners</p>
                </div>
                <span className="rounded-full border border-tech/40 bg-tech/15 px-3.5 py-1 text-xs font-mono font-bold text-tech">
                  Official Delegation
                </span>
              </div>
              <OrganizationRegistrationForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-night py-14">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end">
          <div><p className="font-display text-2xl font-semibold">NAVONMESH SUMMIT 2026</p><p className="mt-3 max-w-xl text-sm text-night-foreground/55">Organized by Quality Thought Future Skills Foundation. Presented by BSNL. Knowledge Partner: CMR Group of Institutions.</p></div>
          <div className="text-sm text-night-foreground/55 md:text-right"><p className="font-semibold text-night-foreground">29–31 October 2026</p><p>CMR Group of Institutions Campus</p><p>Medchal, Hyderabad</p></div>
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}

function PartnerLogo({
  src,
  alt,
  role,
  caption,
  align = "center",
  variant = "default",
  delay = "0s",
}: {
  src: string;
  alt: string;
  role: string;
  caption?: string;
  align?: "start" | "center" | "end";
  variant?: "default" | "bsnl" | "cmr";
  delay?: string;
}) {
  const isBsnl = variant === "bsnl";
  const isCmr = variant === "cmr";

  return (
    <div
      className="flex min-w-0 w-full flex-col items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 group"
      style={{ animationDelay: delay }}
    >
      <div className="flex max-w-full items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-night-deep/90 border border-white/10 shadow-sm">
        <span
          className={`size-1.5 shrink-0 rounded-full ${
            isBsnl ? "bg-signal animate-ping" : isCmr ? "bg-emerald-400 animate-pulse" : "bg-tech"
          }`}
        />
        <span className="min-w-0 flex-1 truncate text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-night-foreground/90 sm:max-w-none">
          {role}
        </span>
      </div>

      <div
        className={`relative flex items-center justify-center rounded-2xl bg-white px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 group-hover:scale-105 ${
          isBsnl
            ? "h-14 sm:h-16 md:h-18 w-full max-w-[180px] sm:max-w-[215px] ring-2 ring-tech/80 shadow-[0_8px_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)]"
            : isCmr
              ? "h-13 sm:h-15 md:h-17 w-full max-w-[170px] sm:max-w-[200px] ring-1.5 ring-emerald-400/50 shadow-[0_6px_25px_rgba(0,0,0,0.5)] hover:ring-emerald-400 hover:shadow-[0_0_25px_rgba(52,211,153,0.35)]"
              : "h-13 sm:h-15 md:h-17 w-full max-w-[170px] sm:max-w-[200px] ring-1.5 ring-tech/40 shadow-[0_6px_25px_rgba(0,0,0,0.5)] hover:ring-tech hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]"
        }`}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-auto max-h-full max-w-full object-contain filter drop-shadow-sm"
        />
      </div>

      {caption && (
        <span className="max-w-full truncate text-[10px] sm:text-[11px] font-medium text-night-foreground/75 text-center leading-tight">
          {caption}
        </span>
      )}
    </div>
  );
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text: string; light?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
      <div><p className={`text-xs font-bold uppercase tracking-[.18em] ${light ? "text-signal" : "text-tech"}`}>{eyebrow}</p><h2 className="mt-3 max-w-2xl text-balance font-display text-4xl font-semibold sm:text-5xl">{title}</h2></div>
      <p className={`max-w-2xl text-lg leading-relaxed ${light ? "text-navy/65" : "text-night-foreground/60"}`}>{text}</p>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
  detail,
  more,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  detail: string;
  more: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="cursor-pointer bg-night p-7 text-left transition-colors hover:bg-night-surface">
          <Icon className="size-5 text-tech" />
          <p className="mt-8 font-display text-lg font-semibold">{label}</p>
          <p className="mt-1 text-sm text-night-foreground/50">{detail}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[.12em] text-tech">Read more →</p>
        </article>
      </DialogTrigger>
      <DialogContent className="border-night-foreground/10 bg-night-surface text-night-foreground sm:max-w-lg">
        <DialogHeader>
          <span className="grid size-11 place-items-center rounded-full bg-tech/10 text-tech">
            <Icon className="size-5" />
          </span>
          <DialogTitle className="mt-3 font-display text-2xl text-night-foreground">
            {value} — {label}
          </DialogTitle>
          <DialogDescription className="text-night-foreground/65">{detail}</DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-night-foreground/75">{more}</p>
      </DialogContent>
    </Dialog>
  );
}

function JourneyStep({ icon: Icon, number, title, text, last = false }: { icon: LucideIcon; number: string; title: string; text: string; last?: boolean }) {
  return <article className="relative rounded-lg border border-night-foreground/10 bg-night p-6"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-full bg-tech/10 text-tech"><Icon className="size-5" /></span><span className="font-display text-sm text-signal">{number}</span></div><h3 className="mt-7 font-display text-2xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-night-foreground/55">{text}</p>{!last && <span className="event-link absolute -right-4 top-10 z-10 hidden h-px w-8 bg-tech/60 lg:block" />}</article>;
}

function TechnologyCard({ technology }: { technology: Technology }) {
  const Icon = technology.icon;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="group relative isolate min-h-[430px] cursor-pointer overflow-hidden rounded-lg border border-night-foreground/10 bg-night-surface p-7 text-left transition-transform duration-500 hover:-translate-y-1 sm:p-9">
          <img src={technology.image} loading="lazy" referrerPolicy="no-referrer" width={1200} height={900} alt="" className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 -z-10 bg-card-wash" />
          <div className="flex items-start justify-between">
            <span className="grid size-14 place-items-center rounded-lg border border-tech/30 bg-night/70 text-tech backdrop-blur"><Icon className="size-7" strokeWidth={1.5} /></span>
            <span className="font-display text-5xl font-light text-night-foreground/20">{technology.number}</span>
          </div>
          <div className="mt-32 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-tech">{technology.label} sector</p>
            <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{technology.title}</h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-night-foreground/65">{technology.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{technology.tags.map((tag) => <span key={tag} className="rounded-full border border-night-foreground/15 bg-night/45 px-3 py-1 text-xs text-night-foreground/65 backdrop-blur">{tag}</span>)}</div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[.12em] text-tech">Read more →</p>
          </div>
        </article>
      </DialogTrigger>
      <DialogContent className="border-night-foreground/10 bg-night-surface text-night-foreground sm:max-w-lg">
        <DialogHeader>
          <span className="text-xs font-bold uppercase tracking-[.18em] text-tech">{technology.label} sector</span>
          <DialogTitle className="font-display text-2xl text-night-foreground">{technology.title}</DialogTitle>
          <DialogDescription className="text-night-foreground/65">{technology.description}</DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-night-foreground/75">{technology.detail}</p>
        <div className="flex flex-wrap gap-2">{technology.tags.map((tag) => <span key={tag} className="rounded-full border border-night-foreground/15 bg-night/45 px-3 py-1 text-xs text-night-foreground/65">{tag}</span>)}</div>
      </DialogContent>
    </Dialog>
  );
}