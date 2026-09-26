import { createFileRoute } from "@tanstack/react-router";
import { SubmissionFormPage } from "@/components/registration/form-page";

// Direct link to the "Call for Speakers" form — lightweight page, popup opens immediately.
export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: "Call for Speakers | Navonmesh Summit 2026" },
      {
        name: "description",
        content:
          "Apply to speak at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) — keynotes, panels, workshops and technical talks. Last date: 10 Oct 2026.",
      },
    ],
  }),
  component: () => <SubmissionFormPage slug="speakers" />,
});
