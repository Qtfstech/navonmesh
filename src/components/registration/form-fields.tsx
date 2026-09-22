import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Field({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-signal">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function YesNoField({
  label,
  name,
  value,
  onChange,
  note,
  error,
  className,
}: {
  label: string;
  name: string;
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  note?: string;
  error?: string | undefined;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <Label>{label}</Label>
      {note && <p className="text-xs text-navy/55">{note}</p>}
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as "yes" | "no")}
        className="flex gap-6 pt-1"
      >
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <RadioGroupItem value="yes" id={`${name}-yes`} />
          Yes
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <RadioGroupItem value="no" id={`${name}-no`} />
          No
        </label>
      </RadioGroup>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
