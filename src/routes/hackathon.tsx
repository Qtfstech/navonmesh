import { createFileRoute } from "@tanstack/react-router";
import { SubmissionFormPage } from "@/components/registration/form-page";

// Direct link to the "Navonmesh HackFest" form — lightweight page, popup opens immediately.
export const Route = createFileRoute("/hackathon")({
  head: () => ({
    meta: [
      { title: "BSNL HackFest | Navonmesh Summit 2026" },
      {
        name: "description",
        content:
          "Register for BSNL HackFest at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) — build real-world automation, 5G and IoT prototypes. ₹499/- per participant. Last date: 25 Oct 2026.",
      },
    ],
  }),
  component: () => <SubmissionFormPage slug="hackathon" />,
});
