import { createFileRoute } from "@tanstack/react-router";
import { SubmissionFormPage } from "@/components/registration/form-page";

// Direct link to the "Pitch an Innovation" form — lightweight page, popup opens immediately.
export const Route = createFileRoute("/startup-pitches")({
  head: () => ({
    meta: [
      { title: "Startup Pitches | Navonmesh Summit 2026" },
      {
        name: "description",
        content:
          "Pitch your startup or innovation at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) to industry leaders, investors and mentors. Last date: 25 Oct 2026.",
      },
    ],
  }),
  component: () => <SubmissionFormPage slug="ideas" />,
});
