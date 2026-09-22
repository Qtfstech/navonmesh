import { z } from "zod";
import {
  Lightbulb,
  Megaphone,
  Store,
  Trophy,
  Code2,
  type LucideIcon,
} from "lucide-react";
import type { SubmissionSlug } from "@/lib/api";

export type FormField = {
  key: string;
  label: string;
  kind: "text" | "email" | "mobile" | "url" | "longtext" | "select" | "radio";
  required: boolean;
  placeholder?: string;
  options?: readonly string[];
  optionNotes?: Record<string, string>;
  wide?: boolean;
};

export type SubmissionForm = {
  slug: SubmissionSlug;
  title: string;
  intro: string;
  audience: string;
  summary: string;
  icon: LucideIcon;
  submitLabel: string;
  successMessage: string;
  fields: FormField[];
};

export const domains = [
  "5G & Telecom",
  "Industry 4.0 / Automation",
  "Electrical & Electronics",
  "IT, ITeS & Digital Media",
  "Agri-tech",
  "Health-tech",
  "Renewable Energy",
  "Circular Economy",
  "Other",
] as const;

export const submissionForms: SubmissionForm[] = [
  {
    slug: "ideas",
    title: "Pitch an Innovation",
    intro:
      "Present your novel technology or startup idea to industry leaders, BSNL partners, and academic mentors.",
    audience: "Innovators & Startups",
    summary:
      "Pitch concepts, working prototypes, or MVPs in emerging tech sectors. Top innovators get direct incubation and mentorship.",
    icon: Lightbulb,
    submitLabel: "Submit Innovation Pitch",
    successMessage: "Your innovation pitch has been submitted successfully!",
    fields: [
      { key: "name", label: "Your Full Name", kind: "text", required: true, placeholder: "e.g. Rahul Sharma" },
      { key: "organization", label: "Organization / University", kind: "text", required: true, placeholder: "Company or College Name" },
      { key: "email", label: "Email Address", kind: "email", required: true, placeholder: "you@example.com" },
      { key: "mobile", label: "Mobile Number", kind: "mobile", required: true, placeholder: "+91 98765 43210" },
      { key: "ideaTitle", label: "Project / Idea Title", kind: "text", required: true, wide: true, placeholder: "Title of your project" },
      { key: "domain", label: "Domain / Focus Sector", kind: "select", required: true, options: domains },
      { key: "stage", label: "Current Maturity Stage", kind: "select", required: true, options: ["Concept", "Prototype", "MVP", "Launched"] },
      { key: "summary", label: "Idea Summary & Problem Solved", kind: "longtext", required: true, wide: true, placeholder: "Describe the core innovation, target problem, and impact (min 10 characters)..." },
    ],
  },
  {
    slug: "speakers",
    title: "Call for Speakers",
    intro:
      "Nominate yourself or a thought leader to speak in technical keynotes, panels, and workshops at Navonmesh 2026.",
    audience: "Thought Leaders & Researchers",
    summary:
      "Share insights on 5G infrastructure, digital transformation, and industrial automation with 1000+ delegates.",
    icon: Megaphone,
    submitLabel: "Submit Speaker Nomination",
    successMessage: "Speaker nomination received! Our curation committee will review your proposal.",
    fields: [
      { key: "name", label: "Speaker Full Name", kind: "text", required: true, placeholder: "Dr. / Prof. / Mr. / Ms." },
      { key: "designation", label: "Current Designation", kind: "text", required: true, placeholder: "e.g. Chief Architect / Director" },
      { key: "organization", label: "Organization / Institution", kind: "text", required: true, placeholder: "e.g. Telecom Labs Ltd" },
      { key: "email", label: "Work Email", kind: "email", required: true, placeholder: "speaker@domain.com" },
      { key: "mobile", label: "Contact Mobile", kind: "mobile", required: true, placeholder: "+91 98765 43210" },
      { key: "topic", label: "Proposed Talk / Session Topic", kind: "text", required: true, wide: true, placeholder: "e.g. Deploying Open-RAN at Scale" },
      { key: "sessionFormat", label: "Preferred Session Format", kind: "select", required: true, options: ["Keynote", "Panel discussion", "Workshop", "Technical talk"] },
      { key: "linkedin", label: "LinkedIn Profile URL", kind: "url", required: false, placeholder: "https://linkedin.com/in/username" },
      { key: "bio", label: "Speaker Biography & Past Speaking Experience", kind: "longtext", required: true, wide: true, placeholder: "Brief bio highlighting expertise..." },
    ],
  },
  {
    slug: "expo",
    title: "Exhibit at Tech Expo",
    intro:
      "Book an exhibition booth or demo space to showcase hardware, enterprise software, and solutions to buyers and BSNL integrators.",
    audience: "Enterprises & Hardware Makers",
    summary:
      "Showcase shipping products, field-ready gear, and automation solutions directly to enterprise procurement teams.",
    icon: Store,
    submitLabel: "Request Expo Booth",
    successMessage: "Expo stall request received! The expo coordinator will contact you with floor plans.",
    fields: [
      { key: "companyName", label: "Company / Organization Name", kind: "text", required: true, placeholder: "e.g. Apex Telematics" },
      { key: "contactName", label: "Primary Contact Person", kind: "text", required: true, placeholder: "e.g. Anita Desai" },
      { key: "email", label: "Official Email", kind: "email", required: true, placeholder: "expo@company.com" },
      { key: "mobile", label: "Phone / Mobile", kind: "mobile", required: true, placeholder: "+91 98765 43210" },
      { key: "offeringType", label: "Offering Type", kind: "select", required: true, options: ["Product", "Service", "Prototype"] },
      { key: "offeringName", label: "Product / Solution Name", kind: "text", required: true, placeholder: "Name of hardware or suite" },
      { key: "domain", label: "Industry Sector", kind: "select", required: true, options: domains },
      { key: "boothSize", label: "Preferred Stall Size", kind: "select", required: true, options: ["Tabletop", "Standard (3m × 3m)", "Large (6m × 3m)", "Custom"] },
      { key: "website", label: "Company Website", kind: "url", required: false, placeholder: "https://example.com" },
      { key: "description", label: "Demo & Power / Spatial Requirements", kind: "longtext", required: true, wide: true, placeholder: "Outline what you will display and any specific power/space needs..." },
    ],
  },
  {
    slug: "awards",
    title: "Nominate for Awards",
    intro:
      "Celebrate visionary leadership, engineering breakthroughs, and transformative contributions to Indian industry.",
    audience: "Organizations & Achievers",
    summary:
      "Recognizing standout contributions across Telecom, Industry 4.0, Green Energy, and Agri-tech innovations.",
    icon: Trophy,
    submitLabel: "Submit Award Nomination",
    successMessage: "Award nomination submitted for jury evaluation!",
    fields: [
      { key: "nominationType", label: "Nomination Type", kind: "radio", required: true, options: ["Organization", "Individual"] },
      { key: "nomineeName", label: "Nominee Name / Company", kind: "text", required: true, placeholder: "Nominee's full name or company" },
      { key: "nomineeOrganization", label: "Nominee Organization (if individual)", kind: "text", required: false, placeholder: "Affiliated company or institution" },
      { key: "category", label: "Award Category / Domain", kind: "select", required: true, options: domains },
      { key: "nominatorName", label: "Your Name (Nominator)", kind: "text", required: true, placeholder: "Your name" },
      { key: "email", label: "Nominator Email", kind: "email", required: true, placeholder: "you@domain.com" },
      { key: "mobile", label: "Nominator Mobile", kind: "mobile", required: true, placeholder: "+91 98765 43210" },
      { key: "achievements", label: "Key Achievements & Impact Metrics", kind: "longtext", required: true, wide: true, placeholder: "Provide tangible impact, patents, deployments, or metrics supporting this nomination..." },
    ],
  },
  {
    slug: "hackathon",
    title: "Navonmesh Hackathon 2026",
    intro:
      "Compete in building real-world automation, 5G applications, and IoT systems. Winners earn an MoU pathway with BSNL!",
    audience: "Students & Developers",
    summary:
      "A fast-paced build sprint solving industry problem statements. Entry fee ₹500/participant with direct BSNL SI tie-up opportunity.",
    icon: Code2,
    submitLabel: "Register for Hackathon",
    successMessage: "Hackathon registration received! Check your inbox for problem statements and logistics.",
    fields: [
      { key: "name", label: "Lead Participant Name", kind: "text", required: true, placeholder: "Team lead's name" },
      { key: "institution", label: "College / University Name", kind: "text", required: true, placeholder: "e.g. CMR Technical Campus" },
      { key: "email", label: "Primary Email Address", kind: "email", required: true, placeholder: "lead@college.edu" },
      { key: "mobile", label: "Mobile Number (WhatsApp)", kind: "mobile", required: true, placeholder: "+91 98765 43210" },
      { key: "teamName", label: "Team Name (Optional)", kind: "text", required: false, placeholder: "e.g. CyberVanguard" },
      { key: "teamSize", label: "Team Size", kind: "select", required: true, options: ["1 (solo)", "2", "3", "4"] },
      { key: "track", label: "Preferred Hackathon Track", kind: "select", required: true, options: domains },
      { key: "experience", label: "Tech Stack & Past Projects", kind: "longtext", required: false, wide: true, placeholder: "Mention relevant programming languages, hardware kits, or previous hackathons..." },
    ],
  },
];

function fieldSchema(field: FormField) {
  let schema: z.ZodTypeAny;
  switch (field.kind) {
    case "email":
      schema = z.string().trim().email("Enter a valid email address");
      break;
    case "mobile":
      schema = z
        .string()
        .trim()
        .min(7, "Enter a valid mobile number")
        .max(20, "Enter a valid mobile number");
      break;
    case "longtext":
      schema = z.string().trim().max(3000, "Please keep this under 3000 characters");
      break;
    case "url":
      schema = z.string().trim().max(300);
      break;
    default:
      schema = z.string().trim().max(300, "Too long");
  }

  if (!field.required) {
    return schema.optional().default("");
  }
  if (field.kind === "longtext") {
    return (schema as z.ZodString).min(10, "Please add a little more detail");
  }
  if (field.kind === "text" || field.kind === "select" || field.kind === "radio") {
    return (schema as z.ZodString).min(1, "This field is required");
  }
  return schema;
}

export function buildFormSchema(form: SubmissionForm) {
  return z.object(Object.fromEntries(form.fields.map((f) => [f.key, fieldSchema(f)])));
}
