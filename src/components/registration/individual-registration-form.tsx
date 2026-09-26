import { useState, type FormEvent } from "react";
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
  buildFormSchema,
  domains,
  professions,
  submissionForms,
} from "@/data/submission-forms";
import { submitForm } from "@/lib/api";

const individualForm = submissionForms.find((form) => form.slug === "individual")!;
const schema = buildFormSchema(individualForm);

type FormState = {
  fullName: string;
  profession: string;
  organization: string;
  areaOfInterest: string;
  mobile: string;
  email: string;
  nominateIndividualAward: string;
};

const emptyForm: FormState = {
  fullName: "",
  profession: "",
  organization: "",
  areaOfInterest: "",
  mobile: "",
  email: "",
  nominateIndividualAward: "",
};

export function IndividualRegistrationForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function updateField(key: keyof FormState, value: string) {
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

    const parsed = schema.safeParse(form);
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
      await submitForm("individual", parsed.data as Record<string, string>);
      toast.success(individualForm.successMessage);
      setForm(emptyForm);
      setErrors({});
      onSuccess?.();
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
        <Field label="Full name" htmlFor="fullName" error={errors.fullName} required>
          <Input
            id="fullName"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Full name"
          />
        </Field>

        <Field label="You are a" htmlFor="profession" error={errors.profession} required>
          <Select value={form.profession} onValueChange={(value) => updateField("profession", value)}>
            <SelectTrigger id="profession">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              {professions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Organization / Institution" htmlFor="organization" error={errors.organization}>
          <Input
            id="organization"
            value={form.organization}
            onChange={(e) => updateField("organization", e.target.value)}
            placeholder="Company or college (optional)"
          />
        </Field>

        <Field label="Area of interest" htmlFor="areaOfInterest" error={errors.areaOfInterest} required>
          <Select
            value={form.areaOfInterest}
            onValueChange={(value) => updateField("areaOfInterest", value)}
          >
            <SelectTrigger id="areaOfInterest">
              <SelectValue placeholder="Select an area" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Mobile number" htmlFor="individualMobile" error={errors.mobile} required>
          <Input
            id="individualMobile"
            type="tel"
            value={form.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
            placeholder="+91 90000 00000"
          />
        </Field>

        <Field label="Email" htmlFor="individualEmail" error={errors.email} required>
          <Input
            id="individualEmail"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="border-t border-navy/10 pt-6">
        <YesNoField
          label="Nominate yourself for an individual award?"
          name="individualNominateAward"
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
        className="w-full rounded-full bg-signal text-paper hover:bg-signal/90 sm:w-auto sm:justify-self-start"
      >
        {submitting ? "Submitting…" : "Register as individual"}
      </Button>
    </form>
  );
}
