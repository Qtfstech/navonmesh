export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  keywords?: string[];
  action?: { label: string; href: string };
};

export const faqDataset: FaqEntry[] = [
  {
    id: "venue",
    question: "Where is Navonmesh Summit 2026 taking place?",
    answer:
      "Navonmesh Summit 2026 is being held at CMR Technical Campus / Group of Institutions in Medchal, Hyderabad, Telangana, from 29 to 31 October 2026.",
    action: {
      label: "Open in Google Maps",
      href: "https://maps.google.com/?q=CMR+Technical+Campus+Medchal+Hyderabad",
    },
    keywords: ["venue", "location", "where", "directions", "cmr", "hyderabad", "medchal", "address", "map"],
  },
  {
    id: "register-org",
    question: "How do organizations register for the summit?",
    answer:
      "Organizations can register to showcase products at the Tech Expo, sponsor the summit, nominate for industry awards, or send delegates using the Registration form on this site.",
    action: { label: "Go to Registration", href: "/register" },
    keywords: ["register", "organization", "company", "booth", "exhibit", "expo", "delegate", "corporate", "pass"],
  },
  {
    id: "fee-hackathon",
    question: "What is the fee for Navonmesh HackFest?",
    answer:
      "The entry fee for Navonmesh HackFest is ₹499/- per participant. Teams build working prototypes on real industry problem statements.",
    action: { label: "Register for HackFest", href: "#get-involved-hackathon" },
    keywords: ["fee", "cost", "hackathon", "hackfest", "student", "price", "entry", "bsnl", "prize"],
  },
  {
    id: "sponsorship",
    question: "What sponsorship opportunities are available?",
    answer:
      "We offer multiple sponsorship tiers including Title, Platinum, Gold, and Track partnerships. Sponsors gain prime exhibition booths, keynote speaking slots, and extensive branding across digital and venue channels.",
    action: { label: "Explore Sponsorship", href: "/sponsorship" },
    keywords: ["sponsorship", "sponsor", "packages", "tier", "partner", "branding", "cost", "commercials"],
  },
  {
    id: "dates",
    question: "What are the summit dates and timings?",
    answer:
      "The summit runs for three full days from 29th October to 31st October 2026, starting at 9:00 AM IST daily.",
    keywords: ["dates", "when", "time", "schedule", "days", "timing", "october"],
  },
  {
    id: "bsnl",
    question: "What is BSNL's role in the summit?",
    answer:
      "BSNL is a premier partner of Navonmesh Summit 2026. BSNL leadership will participate in keynotes, explore indigenous telecom equipment from exhibitors, and mentor standout HackFest prototypes.",
    keywords: ["bsnl", "telecom", "partner", "government"],
  },
  {
    id: "sectors",
    question: "What sectors are covered in Navonmesh?",
    answer:
      "The summit highlights 8 core domains: 5G & Telecom, Industry 4.0 / Automation, Electrical & Electronics, IT / ITeS, Agri-tech, Health-tech, Renewable Energy, and Circular Economy.",
    keywords: ["sectors", "tracks", "domains", "topics", "focus", "5g", "iot", "ai"],
  },
];

export function searchFaq(query: string): FaqEntry | null {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return null;

  // Direct match in dataset
  for (const entry of faqDataset) {
    if (entry.question.toLowerCase().includes(normalized)) {
      return entry;
    }
    if (entry.keywords?.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return entry;
    }
  }

  // Token based match
  const tokens = normalized.split(/\s+/).filter((t) => t.length > 2);
  let bestEntry: FaqEntry | null = null;
  let maxScore = 0;

  for (const entry of faqDataset) {
    let score = 0;
    for (const token of tokens) {
      if (entry.question.toLowerCase().includes(token)) score += 3;
      if (entry.answer.toLowerCase().includes(token)) score += 1;
      if (entry.keywords?.some((kw) => kw.toLowerCase().includes(token))) score += 2;
    }
    if (score > maxScore) {
      maxScore = score;
      bestEntry = entry;
    }
  }

  return maxScore >= 2 ? bestEntry : null;
}
