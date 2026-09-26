import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { RegistrationDialog } from "@/components/registration/registration-dialog";
import { FormPageShell } from "@/components/registration/form-page";

// /register is a deliberately lightweight page: no 3D canvases, images or home-page code,
// so the registration popup is interactive almost immediately. Closing it goes home.
export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register | Navonmesh Summit 2026, Hyderabad" },
      {
        name: "description",
        content:
          "Register for Navonmesh Summit 2026 (29–31 Oct, CMR Campus, Hyderabad) as an organization or individual — delegate passes, expo, sponsorship and award nominations.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <FormPageShell eyebrow="Registration">
      <RegistrationDialog
        open
        onOpenChange={(open) => {
          if (!open) void navigate({ to: "/" });
        }}
      />
    </FormPageShell>
  );
}
