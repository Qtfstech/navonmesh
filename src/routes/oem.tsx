import { createFileRoute } from "@tanstack/react-router";
import { SubmissionFormPage } from "@/components/registration/form-page";

// Direct link to the "OEM Registration" form — lightweight page, popup opens immediately.
export const Route = createFileRoute("/oem")({
  head: () => ({
    meta: [
      { title: "OEM Registration | Navonmesh Summit 2026" },
      {
        name: "description",
        content:
          "Register your manufacturing company for the OEM Pavilion at Navonmesh Summit 2026 (29–31 Oct, Hyderabad) — meet buyers and integrators. Last date: 15 Oct 2026.",
      },
    ],
  }),
  component: () => <SubmissionFormPage slug="oem" />,
});
