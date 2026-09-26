import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/registration/form-fields";
import { buildFormSchema, type FormField, type SubmissionForm } from "@/data/submission-forms";
import { submitForm } from "@/lib/api";

type Values = Record<string, string>;

function emptyValues(form: SubmissionForm): Values {
  return Object.fromEntries(form.fields.map((f) => [f.key, ""]));
}

export function SubmissionFormDialog({
  form,
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  form: SubmissionForm;
  /** The element that opens the popup (rendered with `asChild`). Omit when controlled. */
  children?: ReactNode;
  /** Controlled mode (e.g. a /speakers page that shows the form straight away). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  const [values, setValues] = useState<Values>(() => emptyValues(form));
  const [errors, setErrors] = useState<Values>({});
  const [submitting, setSubmitting] = useState(false);

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
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

    const parsed = buildFormSchema(form).safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Values = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      await submitForm(form.slug, parsed.data as Values);
      toast.success(form.successMessage);
      setValues(emptyValues(form));
      setErrors({});
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  const Icon = form.icon;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="bg-paper text-navy sm:max-w-2xl">
        <DialogHeader>
          <span className="grid size-11 place-items-center rounded-full bg-signal/10 text-signal">
            <Icon className="size-5" />
          </span>
          <DialogTitle className="mt-2 pr-6 font-display text-xl sm:text-2xl">{form.title}</DialogTitle>
          <DialogDescription className="text-navy/65">{form.intro}</DialogDescription>
          {form.deadline && (
            <p className="text-xs font-semibold text-signal">Last date to apply: {form.deadline}</p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {form.fields.map((field) => (
              <DynamicField
                key={field.key}
                formSlug={form.slug}
                field={field}
                value={values[field.key] ?? ""}
                error={errors[field.key]}
                onChange={(v) => setValue(field.key, v)}
              />
            ))}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full rounded-full bg-signal text-paper hover:bg-signal/90 sm:w-auto sm:justify-self-start"
          >
            {submitting ? "Submitting…" : form.submitLabel}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DynamicField({
  formSlug,
  field,
  value,
  error,
  onChange,
}: {
  formSlug: string;
  field: FormField;
  value: string;
  error: string | undefined;
  onChange: (value: string) => void;
}) {
  const id = `${formSlug}-${field.key}`;
  const span = field.wide ? "sm:col-span-2" : "";
  const note = field.optionNotes?.[value];

  if (field.kind === "radio") {
    return (
      <div className={`grid gap-1.5 ${span}`}>
        <Label>
          {field.label}
          {field.required && <span className="ml-0.5 text-signal">*</span>}
        </Label>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-wrap gap-x-6 gap-y-2 pt-1"
        >
          {field.options?.map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2 text-sm">
              <RadioGroupItem value={option} id={`${id}-${option}`} />
              {option}
            </label>
          ))}
        </RadioGroup>
        {note && <p className="text-xs font-medium text-signal">{note}</p>}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <Field
      label={field.label}
      htmlFor={id}
      error={error}
      required={field.required}
      className={span}
    >
      {field.kind === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.kind === "longtext" ? (
        <Textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      ) : (
        <Input
          id={id}
          type={
            field.kind === "email"
              ? "email"
              : field.kind === "mobile"
                ? "tel"
                : field.kind === "url"
                  ? "url"
                  : "text"
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      )}
    </Field>
  );
}
