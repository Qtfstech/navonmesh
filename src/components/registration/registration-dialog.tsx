import { useState } from "react";
import { Building2, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrganizationRegistrationForm } from "@/components/registration/organization-registration-form";
import { IndividualRegistrationForm } from "@/components/registration/individual-registration-form";

type RegistrantType = "organization" | "individual";

const copy: Record<RegistrantType, { title: string; badge: string; description: string }> = {
  organization: {
    title: "Organization Registration",
    badge: "Official Delegation",
    description: "Enterprise Delegates · Exhibitors · Academic Institutions · Industry Partners",
  },
  individual: {
    title: "Individual Registration",
    badge: "Delegate Pass",
    description: "Students · Researchers · Professionals · Founders · Investors",
  },
};

/** Registration popup — opened by every "Register" link and by /register. */
export function RegistrationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [type, setType] = useState<RegistrantType>("organization");
  const text = copy[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-tech/30 bg-night text-night-foreground sm:max-w-3xl sm:p-7">
        <DialogHeader className="border-b border-night-foreground/10 pb-4 pr-6 text-left">
          <div className="flex flex-wrap items-center gap-3">
            <DialogTitle className="font-display text-xl font-bold text-white sm:text-2xl">{text.title}</DialogTitle>
            <span className="rounded-full border border-tech/40 bg-tech/15 px-3 py-0.5 text-xs font-mono font-bold text-tech">
              {text.badge}
            </span>
          </div>
          <DialogDescription className="text-night-foreground/65">{text.description}</DialogDescription>
        </DialogHeader>

        <div
          role="radiogroup"
          aria-label="Register as"
          className="grid grid-cols-2 gap-1 rounded-full border border-night-foreground/15 bg-night-deep p-1"
        >
          {(
            [
              ["organization", "Organization", Building2],
              ["individual", "Individual", User],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={type === value}
              onClick={() => setType(value)}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                type === value
                  ? "bg-signal text-paper shadow-md shadow-signal/30"
                  : "text-night-foreground/70 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {type === "organization" ? (
          <OrganizationRegistrationForm onSuccess={() => onOpenChange(false)} />
        ) : (
          <IndividualRegistrationForm onSuccess={() => onOpenChange(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
