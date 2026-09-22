import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Mail } from "lucide-react";

export const Route = createFileRoute("/sponsorship")({
  head: () => ({
    meta: [
      { title: "Sponsorship | Navonmesh Summit 2026" },
      {
        name: "description",
        content:
          "Partner with Navonmesh Summit 2026 as a sponsor — tiers, benefits and next steps.",
      },
    ],
  }),
  component: SponsorshipPage,
});

type Tier = {
  name: string;
  price: string;
  benefits: string[];
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Title Sponsor",
    price: "Contact us",
    highlight: true,
    benefits: [
      "Presenting-partner branding across all summit materials",
      "Prime keynote / plenary speaking slot",
      "Largest expo footprint with premium placement",
      "Logo on stage backdrop, delegate kits and signage",
      "Dedicated media and press mentions",
    ],
  },
  {
    name: "Platinum",
    price: "Contact us",
    benefits: [
      "Panel or breakout session speaking slot",
      "Premium expo booth placement",
      "Logo on stage backdrop and delegate kits",
      "5 complimentary delegate passes",
    ],
  },
  {
    name: "Gold",
    price: "Contact us",
    benefits: [
      "Expo booth space",
      "Logo on event signage and website",
      "3 complimentary delegate passes",
    ],
  },
  {
    name: "Community / Startup Partner",
    price: "Contact us",
    benefits: [
      "Shared expo table",
      "Logo on website sponsor wall",
      "1 complimentary delegate pass",
    ],
  },
];

function SponsorshipPage() {
  return (
    <main className="min-h-screen bg-night text-night-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-night-foreground/60 transition-colors hover:text-tech"
        >
          <ArrowLeft className="size-4" />
          Back to Navonmesh Summit
        </Link>

        <div className="mt-8 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1 w-9 rounded-full bg-[#FF9933]" />
          <span className="h-1 w-9 rounded-full bg-night-foreground/80" />
          <span className="h-1 w-9 rounded-full bg-[#138808]" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-tech">
          Partner with us
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-semibold sm:text-5xl">
          Sponsor Navonmesh Summit 2026
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-night-foreground/65">
          Thanks for your interest in sponsoring the summit. Below are the sponsorship tiers we
          offer — reach out to our partnerships team and we'll help you pick the right fit and
          confirm pricing and availability.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-lg border p-6 ${
                tier.highlight
                  ? "border-signal/40 bg-night-surface shadow-signal"
                  : "border-night-foreground/10 bg-night-surface"
              }`}
            >
              <p className="font-display text-xl font-semibold">{tier.name}</p>
              <p className="mt-1 text-sm text-tech">{tier.price}</p>
              <ul className="mt-5 grid flex-1 gap-3">
                {tier.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-night-foreground/70"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-lg border border-night-foreground/10 bg-night-deep p-8 text-center">
          <p className="font-display text-2xl font-semibold">Ready to talk sponsorship?</p>
          <p className="mt-2 text-night-foreground/65">
            Email our partnerships team and we'll get back to you with pricing and availability.
          </p>
          <a
            href="mailto:partnerships@navonmeshsummit.in"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-signal/90"
          >
            <Mail className="size-4" />
            partnerships@navonmeshsummit.in
          </a>
        </div>
      </div>
    </main>
  );
}
