import { createFileRoute } from "@tanstack/react-router";
import { SubmissionFormPage } from "@/components/registration/form-page";

// Direct link to the "Nominate for Awards" form — lightweight page, popup opens immediately.
export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Nominate for Awards | Navonmesh Summit 2026" },
      {
        name: "description",
        content:
          "Nominate an organization or individual for the Navonmesh Summit 2026 awards, recognising innovation across telecom, Industry 4.0, energy and agri-tech.",
      },
    ],
  }),
  component: () => <SubmissionFormPage slug="awards" />,
});
