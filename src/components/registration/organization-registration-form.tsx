import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, YesNoField } from "@/components/registration/form-fields";
import {
  organizationRegistrationSchema,
  registerOrganization,
  type OrganizationRegistrationInput,
} from "@/lib/api";

const specializations = [
  "5G & Telecom",
  "Industry 4.0 / Automation",
  "Electrical & Electronics",
  "IT, ITeS & Digital Media",
  "Agri-tech",
  "Health-tech",
  "Renewable Energy",
  "Circular Economy",
  "Other",
];

type FormState = { [K in keyof OrganizationRegistrationInput]-?: string };

const emptyForm: FormState = {
  companyName: "",
  specialization: "",
  delegateName: "",
  mobile: "",
  email: "",
  wantsToSponsor: "",
  wantsToPresent: "",
  nominateCompanyAward: "",
  nominateIndividualAward: "",
};

export function OrganizationRegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = organizationRegistrationSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      await registerOrganization(parsed.data);
      toast.success("Registration received — our team will follow up shortly.");
      const wantsToSponsor = parsed.data.wantsToSponsor === "yes";
      setForm(emptyForm);
      setErrors({});
      if (wantsToSponsor) {
        void navigate({ to: "/sponsorship" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-6 rounded-lg border border-navy/10 bg-paper p-7 text-navy shadow-night/5 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name of the company"
          htmlFor="companyName"
          error={errors.companyName}
          required
        >
          <Input
            id="companyName"
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder="Acme Technologies Pvt. Ltd."
          />
        </Field>

        <Field
          label="Area of specialization"
          htmlFor="specialization"
          error={errors.specialization}
          required
        >
          <Select
            value={form.specialization}
            onValueChange={(value) => updateField("specialization", value)}
          >
            <SelectTrigger id="specialization">
              <SelectValue placeholder="Select an area" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Name of the delegate attending"
          htmlFor="delegateName"
          error={errors.delegateName}
          required
        >
          <Input
            id="delegateName"
            value={form.delegateName}
            onChange={(e) => updateField("delegateName", e.target.value)}
            placeholder="Full name"
          />
        </Field>

        <Field label="Mobile number" htmlFor="mobile" error={errors.mobile} required>
          <Input
            id="mobile"
            type="tel"
            value={form.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
            placeholder="+91 90000 00000"
          />
        </Field>

        <Field
          label="Email"
          htmlFor="email"
          error={errors.email}
          required
          className="sm:col-span-2"
        >
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="name@company.com"
          />
        </Field>
      </div>

      <div className="grid gap-6 border-t border-navy/10 pt-6 sm:grid-cols-2">
        <YesNoField
          label="Would you like to sponsor the event?"
          name="wantsToSponsor"
          value={form.wantsToSponsor as "yes" | "no" | ""}
          onChange={(v) => updateField("wantsToSponsor", v)}
          note="Selecting Yes takes you to the sponsorship page after you submit."
          error={errors.wantsToSponsor}
        />

        <YesNoField
          label="Give a presentation about your company?"
          name="wantsToPresent"
          value={form.wantsToPresent as "yes" | "no" | ""}
          onChange={(v) => updateField("wantsToPresent", v)}
          note="₹15,000 for a 10-minute slot — our team will follow up on payment and scheduling."
          error={errors.wantsToPresent}
        />

        <YesNoField
          label="Nominate your company for an award?"
          name="nominateCompanyAward"
          value={form.nominateCompanyAward as "yes" | "no" | ""}
          onChange={(v) => updateField("nominateCompanyAward", v)}
          note="₹10,000 nomination fee — payment details will follow by email."
          error={errors.nominateCompanyAward}
        />

        <YesNoField
          label="Nominate yourself or a peer for an award?"
          name="nominateIndividualAward"
          value={form.nominateIndividualAward as "yes" | "no" | ""}
          onChange={(v) => updateField("nominateIndividualAward", v)}
          note="₹5,000 nomination fee — payment details will follow by email."
          error={errors.nominateIndividualAward}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="justify-self-start rounded-full bg-signal text-paper hover:bg-signal/90"
      >
        {submitting ? "Submitting…" : "Register organization"}
      </Button>
    </form>
  );
}
