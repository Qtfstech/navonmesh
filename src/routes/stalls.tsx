import { createFileRoute } from "@tanstack/react-router";
import { SubmissionFormPage } from "@/components/registration/form-page";

// Direct link to the "Exhibit at Tech Expo" form — lightweight page, popup opens immediately.
export const Route = createFileRoute("/stalls")({
  head: () => ({
    meta: [
      { title: "Book a Stall | Navonmesh Summit 2026 Tech Expo" },
      {
        name: "description",
        content:
          "Book an exhibition stall at Navonmesh Summit 2026 Tech Expo (29–31 Oct, Hyderabad) — showcase products and solutions to enterprise buyers. Last date: 25 Oct 2026.",
      },
    ],
  }),
  component: () => <SubmissionFormPage slug="expo" />,
});
