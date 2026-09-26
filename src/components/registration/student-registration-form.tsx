import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, YesNoField } from "@/components/registration/form-fields";
import {
  studentRegistrationSchema,
  registerStudent,
  type StudentRegistrationInput,
} from "@/lib/api";

type FormState = { [K in keyof StudentRegistrationInput]-?: string };

const emptyForm: FormState = {
  name: "",
  institution: "",
  email: "",
  mobile: "",
  hackathonInterest: "",
  presentPrototype: "",
};

export function StudentRegistrationForm() {
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

    const parsed = studentRegistrationSchema.safeParse(form);
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
      await registerStudent(parsed.data);
      toast.success("Registration received — our team will follow up shortly.");
      setForm(emptyForm);
      setErrors({});
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
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Full name"
          />
        </Field>

        <Field label="Institution" htmlFor="institution" error={errors.institution} required>
          <Input
            id="institution"
            value={form.institution}
            onChange={(e) => updateField("institution", e.target.value)}
            placeholder="College / university"
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="name@example.com"
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
      </div>

      <div className="grid gap-6 border-t border-navy/10 pt-6 sm:grid-cols-2">
        <YesNoField
          label="Interested to participate in the HackFest?"
          name="hackathonInterest"
          value={form.hackathonInterest as "yes" | "no" | ""}
          onChange={(v) => updateField("hackathonInterest", v)}
          note="₹499/- entry fee — payment details will follow by email."
          error={errors.hackathonInterest}
        />

        <YesNoField
          label="Present your prototype or startup idea at the conclave?"
          name="presentPrototype"
          value={form.presentPrototype as "yes" | "no" | ""}
          onChange={(v) => updateField("presentPrototype", v)}
          error={errors.presentPrototype}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full rounded-full bg-signal text-paper hover:bg-signal/90 sm:w-auto sm:justify-self-start"
      >
        {submitting ? "Submitting…" : "Register"}
      </Button>
    </form>
  );
}
